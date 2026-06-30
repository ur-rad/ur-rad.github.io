import { type CollectionEntry, getCollection, getEntry } from "astro:content";

export type Edition = CollectionEntry<"editions">;
export type Person = CollectionEntry<"people">;

export type PageKey = "home" | "call-for-papers" | "people" | "partners" | "program";

/** A person resolved for a specific edition: identity + per-year overrides applied. */
export interface EditionPerson {
	id: string;
	name: string;
	photo: Person["data"]["photo"] | undefined;
	affiliation: string | undefined;
	title: string | undefined;
	website: string | undefined;
	bio: string | undefined;
	roles: ("keynote" | "mentor" | "organizer")[];
	order: number;
}

const PAGE_SEGMENT: Record<PageKey, string> = {
	home: "",
	"call-for-papers": "call-for-papers/",
	people: "people/",
	partners: "partners/",
	program: "program/",
};

export async function getAllEditions(): Promise<Edition[]> {
	const editions = await getCollection("editions");
	return editions.sort((a, b) => b.data.year - a.data.year);
}

export async function getEdition(code: string): Promise<Edition | undefined> {
	return await getEntry("editions", code);
}

/** The default edition shown at the site root. Prefers status "current",
 *  falling back to the most recent year. */
export async function getCurrentEdition(): Promise<Edition> {
	const editions = await getAllEditions();
	const current = editions.find((e) => e.data.status === "current");
	const chosen = current ?? editions[0];
	if (!chosen) {
		throw new Error("No editions found — at least one edition is required.");
	}
	return chosen;
}

/** All editions except the current one (used for the [code] routes). */
export async function getPastEditions(): Promise<Edition[]> {
	const editions = await getAllEditions();
	const current = await getCurrentEdition();
	return editions.filter((e) => e.id !== current.id);
}

/** Resolve an edition's `people` assignments against the people collection,
 *  applying per-year affiliation/title overrides. Optionally filter by role. */
export async function getEditionPeople(
	edition: Edition,
	role?: "keynote" | "mentor" | "organizer",
): Promise<EditionPerson[]> {
	const assignments = edition.data.people ?? [];
	const resolved = await Promise.all(
		assignments.map(async (a, index) => {
			const person = await getEntry("people", a.personId);
			if (!person) {
				console.warn(`Edition ${edition.data.code}: unknown personId "${a.personId}"`);
				return null;
			}
			return {
				id: a.personId,
				name: person.data.name,
				photo: person.data.photo,
				affiliation: a.affiliation ?? person.data.affiliation,
				title: a.title ?? person.data.title,
				website: person.data.website,
				bio: person.data.bio,
				roles: a.roles,
				order: a.order ?? index,
			} satisfies EditionPerson;
		}),
	);
	return resolved
		.filter((p): p is EditionPerson => p !== null)
		.filter((p) => (role ? p.roles.includes(role) : true))
		.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

/** Partners declared on the edition. */
export function getPartners(edition: Edition) {
	return edition.data.partners ?? [];
}

/** The program/schedule entry for an edition code, if present. */
export async function getSchedule(code: string) {
	return await getEntry("program", code);
}

/** "/" for the current edition, "/<code>/" for past editions. */
export function editionBasePath(edition: Edition): string {
	return edition.data.status === "current" ? "/" : `/${edition.data.code}/`;
}

/** Full path to a page within an edition (current → root, past → prefixed). */
export function editionPath(edition: Edition, pageKey: PageKey): string {
	return editionBasePath(edition) + PAGE_SEGMENT[pageKey];
}
