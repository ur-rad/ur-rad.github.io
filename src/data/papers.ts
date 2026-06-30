import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft papers based on the environment */
export async function getAllPapers(): Promise<CollectionEntry<"papers">[]> {
	return await getCollection("papers", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** papers belonging to a given edition (by code), drafts filtered per environment */
export async function getPapersByEdition(
	code: string,
): Promise<CollectionEntry<"papers">[]> {
	const papers = await getAllPapers();
	return papers.filter((p) => p.data.edition === code);
}

/** groups papers by year (based on publishDate), using the year as the key
 *  Note: This function doesn't filter draft papers, pass it the result of getAllPapers above to do so.
 */
export function groupPapersByYear(papers: CollectionEntry<"papers">[]) {
	return papers.reduce<Record<string, CollectionEntry<"papers">[]>>((acc, paper) => {
		const year = paper.data.publishDate.getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(paper);
		return acc;
	}, {});
}

/** returns all tags created from papers (inc duplicate tags)
 *  Note: This function doesn't filter draft papers, pass it the result of getAllPapers above to do so.
 *  */
export function getAllTags(papers: CollectionEntry<"papers">[]) {
	return papers.flatMap((paper) => [...paper.data.tags]);
}

/** returns all unique tags created from papers
 *  Note: This function doesn't filter draft papers, pass it the result of getAllPapers above to do so.
 *  */
export function getUniqueTags(papers: CollectionEntry<"papers">[]) {
	return [...new Set(getAllTags(papers))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft papers, pass it the result of getAllPapers above to do so.
 *  */
export function getUniqueTagsWithCount(papers: CollectionEntry<"papers">[]): [string, number][] {
	return [
		...getAllTags(papers).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
