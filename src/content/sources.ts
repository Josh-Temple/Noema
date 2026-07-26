import { SourceReference } from "@/types/content";

// Shared bibliography. Stable work/section locators are preferred over edition-specific pages.
export const sources: SourceReference[] = [
  { id: "kant-enlightenment", author: "Immanuel Kant", title: "「啓蒙とは何か」への回答", originalTitle: "Beantwortung der Frage: Was ist Aufklärung?", workType: "primary", publicationYear: "1784", locator: "冒頭", url: "https://de.wikisource.org/wiki/Beantwortung_der_Frage:_Was_ist_Aufkl%C3%A4rung%3F" },
  { id: "hobbes-leviathan", author: "Thomas Hobbes", title: "リヴァイアサン", originalTitle: "Leviathan", workType: "primary", publicationYear: "1651", locator: "第13章", url: "https://www.gutenberg.org/ebooks/3207" },
  { id: "locke-understanding", author: "John Locke", title: "人間知性論", originalTitle: "An Essay Concerning Human Understanding", workType: "primary", publicationYear: "1689", locator: "第2巻第1章第2節", url: "https://www.gutenberg.org/ebooks/10615" },
  { id: "locke-government", author: "John Locke", title: "統治二論（後篇）", originalTitle: "Second Treatise of Government", workType: "primary", publicationYear: "1689", locator: "第2章・第9章", url: "https://www.gutenberg.org/ebooks/7370" },
  { id: "rousseau-social-contract", author: "Jean-Jacques Rousseau", title: "社会契約論", originalTitle: "Du contrat social", workType: "primary", publicationYear: "1762", locator: "第1編第1章", url: "https://fr.wikisource.org/wiki/Du_contrat_social/%C3%89dition_1762/Livre_I/Chapitre_I" },
  { id: "mencius", author: "孟子", title: "孟子", workType: "primary", locator: "公孫丑上 6", url: "https://ctext.org/mengzi/gong-sun-chou-i/zh" },
  { id: "xunzi-xing-e", author: "荀子", title: "荀子", workType: "primary", locator: "性悪篇 第23", url: "https://ctext.org/xunzi/xing-e/zh" },
  { id: "arendt-human-condition", author: "Hannah Arendt", title: "人間の条件", originalTitle: "The Human Condition", workType: "primary", publicationYear: "1958", note: "表示文の背景となる行為・複数性・公共領域の議論を参照。" },
  { id: "foucault-history-sexuality-1", author: "Michel Foucault", title: "性の歴史 I 知への意志", originalTitle: "Histoire de la sexualité 1: La volonté de savoir", workType: "primary", publicationYear: "1976", locator: "第4部第2章", note: "表示文の背景となる権力関係の遍在性の議論を参照。" },
  { id: "sep-hobbes-moral-political", author: "Sharon A. Lloyd and Susanne Sreedhar", title: "Hobbes’s Moral and Political Philosophy", workType: "secondary", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/hobbes-moral/" },
  { id: "sep-locke-political", author: "Alex Tuckness", title: "Locke’s Political Philosophy", workType: "secondary", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/locke-political/" },
  { id: "sep-arendt", author: "Maurizio Passerin d'Entrèves", title: "Hannah Arendt", workType: "secondary", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/arendt/" },
  { id: "sep-foucault", author: "Gary Gutting and Johanna Oksala", title: "Michel Foucault", workType: "secondary", publisher: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/foucault/" },
];
