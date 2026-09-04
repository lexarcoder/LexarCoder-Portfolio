import React, { useMemo, useState } from "react";
import { ArrowRight, FolderOpen, Search } from "lucide-react";
import { ALL_TOOLS_DATA, CARD_COLORS } from "../data/AllToolsData";
import Banner from "../../../layout/components/Banner";
import "../style/AllToolsPage.scss";

const FILTER_TABS = [
  "All Tools",
  "Document Tools",
  "Image Tools",
  "Writing Tools",
  "Productivity Tools",
  "AI Utilities",
];

export default function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tools");

  const categoryCounts = useMemo(() => {
    const counts = {
      "All Tools": ALL_TOOLS_DATA.length,
    };

    ALL_TOOLS_DATA.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });

    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();

    return ALL_TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All Tools" || tool.category === selectedCategory;

      const matchesSearch =
        !search ||
        tool.title.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <div className="lexarcoder-marketplace-view">
        <main className="marketplace-container">
          <div className="control-pipeline-wrapper" id="dashboard-controls">
            <div className="search-input-frame">
              <Search className="search-icon-lens page" size={20} />

              <input
                type="text"
                className="native-search-bar page"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="navigation-track-wrapper">
              <nav
                className="filter-tabs-container"
                aria-label="Tool Categories "
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = selectedCategory === tab;
                  const count = categoryCounts[tab] || 0;

                  return (
                    <button
                      key={tab}
                      className={`tab-trigger-btn page${
                        isActive ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedCategory(tab)}
                    >
                      <span className="tab-text">
                        {tab.replace(" Tools", "")}
                      </span>

                      <span className="count-badge">{count}</span>

                      {isActive && (
                        <div className="active-indicator-triangle" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="track-underline-bar" />
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <section className="marketplace-tools-grid">
              {filteredTools.map((tool) => {
                const IconComponent = tool.icon;
                const color = CARD_COLORS[(tool.id - 1) % CARD_COLORS.length];

                return (
                  <article key={tool.id} className="premium-tool-card page">
                    <div className="card-vector-header">
                      <div
                        className="icon-envelope"
                        style={{
                          color,
                          borderColor: `${color}40`,
                          background: `${color}10`,
                        }}
                      >
                        <IconComponent size={22} strokeWidth={2} />
                      </div>

                      <span
                        className="structural-badge"
                        style={{
                          color,
                          borderColor: `${color}40`,
                          background: `${color}10`,
                        }}
                      >
                        {tool.category.replace("Tools", "Tool")}
                      </span>
                    </div>

                    <h3>{tool.title}</h3>

                    <p className="card-description-block">{tool.description}</p>

                    <button
                      className="btn-premium"
                      onClick={() => (window.location.href = tool.route)}
                    >
                      Launch Tool
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  </article>
                );
              })}
            </section>
          ) : (
            <div className="empty-state-envelope">
              <FolderOpen
                className="empty-icon-cloud"
                size={48}
                strokeWidth={1}
              />

              <h4>No tools found.</h4>

              <p>
                Try another search keyword or verify the selected category
                filter.
              </p>
            </div>
          )}
        </main>
      </div>

      <Banner />
    </>
  );
}
