import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { articles, modeCopy } from "@/data/content";

export function Articles() {
  const { mode } = useMode();
  const copy = modeCopy[mode];
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sorted = [...articles].sort((a, b) =>
    sortOrder === "newest" ? b.id - a.id : a.id - b.id
  );

  return (
    <section id="articles" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="articles"
        label={copy.articles.label}
        title={copy.articles.title}
        status="Published: Medium"
      />

      <Reveal>
        <div className="flex justify-end mb-8 relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="mode-card px-4 py-2 text-sm flex items-center gap-2"
          >
            <span className="text-muted-foreground">Sort by:</span>
            <span className="font-medium text-foreground">
              {sortOrder === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-full right-0 mt-2 mode-card overflow-hidden shadow-lg z-30 animate-fade-up"
              style={{ backgroundColor: "hsl(var(--card))" }}
            >
              {(["newest", "oldest"] as const).map((o) => (
                <button
                  key={o}
                  className="block w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-primary/10"
                  onClick={() => {
                    setSortOrder(o);
                    setDropdownOpen(false);
                  }}
                >
                  {o === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((article, index) => (
          <Reveal key={article.id} delay={Math.min(index * 0.06, 0.3)}>
            <a
              href={article.url || undefined}
              target={article.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`mode-card overflow-hidden block group h-full ${
                article.url ? "" : "cursor-default"
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center font-themed-mono text-[11px] text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3 mr-1.5" />
                  <span>{article.date || "Upcoming"}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground">{article.summary}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
