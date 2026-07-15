"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import ScenarioCard, {
  DIFFICULTY_BADGE,
  scenarioGradient,
  scenarioIcon,
} from "@/components/scenarios/ScenarioCard";
import { getScenarios, ScenarioData } from "@/lib/api";

type UserRole = "Faculty" | "Staff" | "Grad Student" | "UG Student";

const ROLE_SCENARIO_MAP: Record<UserRole, number[]> = {
  "Faculty":      [1, 2, 3, 4, 5],
  "Staff":        [1, 4, 5],
  "Grad Student": [2, 3, 5],
  "UG Student":   [5],
};

const ROLES: UserRole[] = ["Faculty", "Staff", "Grad Student", "UG Student"];

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
        active
          ? "bg-primary text-white shadow-md"
          : "bg-white text-on-surface-variant border border-outline-variant hover:bg-primary-fixed hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export default function ScenariosPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    getScenarios()
      .then(setScenarios)
      .catch((err) => { console.error(err); setFetchError(String(err)); })
      .finally(() => setLoading(false));
  }, []);

  const difficulties = useMemo(
    () => Array.from(new Set(scenarios.map((s) => s.difficulty_level))),
    [scenarios]
  );

  const filtered = scenarios.filter(
    (s) =>
      (!selectedRole || ROLE_SCENARIO_MAP[selectedRole].includes(s.scenario_id)) &&
      (!selectedDifficulty || s.difficulty_level === selectedDifficulty)
  );

  const [featured, ...rest] = filtered;

  return (
    <PageShell>
      <div className="relative">
        <div className="fixed inset-0 pointer-events-none plaid-accent z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-12">

          {/* Header + filters */}
          <section className="mb-12">
            <h1 className="text-4xl lg:text-5xl text-primary mb-4 font-bold font-display">
              Scenario Selection
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mb-8">
              Refine your leadership skills through immersive, academic-focused simulations
              designed for women navigating Indian institutions.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  I am a
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  <FilterChip
                    label="All Roles"
                    active={selectedRole === null}
                    onClick={() => setSelectedRole(null)}
                  />
                  {ROLES.map((role) => (
                    <FilterChip
                      key={role}
                      label={role}
                      active={selectedRole === role}
                      onClick={() => setSelectedRole((prev) => (prev === role ? null : role))}
                    />
                  ))}
                </div>
              </div>
              {difficulties.length > 1 && (
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    Difficulty
                  </p>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    <FilterChip
                      label="Any"
                      active={selectedDifficulty === null}
                      onClick={() => setSelectedDifficulty(null)}
                    />
                    {difficulties.map((d) => (
                      <FilterChip
                        key={d}
                        label={d}
                        active={selectedDifficulty === d}
                        onClick={() =>
                          setSelectedDifficulty((prev) => (prev === d ? null : d))
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {fetchError && (
            <div className="text-on-error-container text-sm text-center py-3 bg-error-container border border-error/20 rounded-xl px-4 mb-6">
              API error: {fetchError}
            </div>
          )}

          {loading ? (
            <div className="text-on-surface-variant text-sm py-16 text-center">
              Loading scenarios… (the server may take up to a minute to wake up)
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-on-surface-variant text-sm py-16 text-center">
              No scenarios match these filters yet.
            </div>
          ) : (
            <>
              {/* Featured scenario */}
              {featured && (
                <section className="mb-14">
                  <div className="w-full rounded-2xl overflow-hidden glass-card flex flex-col md:flex-row shadow-lg">
                    <div
                      className={`w-full md:w-1/2 h-56 md:h-auto relative bg-gradient-to-br ${scenarioGradient(featured.scenario_id)} flex items-center justify-center`}
                    >
                      <div className="plaid-accent" />
                      <span className="material-symbols-outlined text-8xl text-primary/50">
                        {scenarioIcon(featured.scenario_id)}
                      </span>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col flex-1 bg-white/40">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-wide">
                          FEATURED MODULE
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${DIFFICULTY_BADGE[featured.difficulty_level] ?? ""}`}
                        >
                          {featured.difficulty_level}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          {featured.estimated_minutes ?? 10} mins
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl text-primary mb-3 leading-tight font-bold font-display">
                        {featured.title}
                      </h2>
                      <p className="text-on-surface-variant mb-3 leading-relaxed line-clamp-3">
                        {featured.context_description}
                      </p>
                      <p className="text-sm text-on-surface-variant mb-8">
                        <span className="font-semibold text-secondary">{featured.adversary_role}</span>
                        {" · "}
                        {featured.barrier_theme}
                      </p>
                      <div className="flex items-center gap-6 mt-auto flex-wrap">
                        <Link
                          href={`/chat?scenario=${featured.scenario_id}`}
                          className="px-8 h-12 flex items-center bg-primary text-white rounded-xl font-semibold hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95"
                        >
                          Start Practice
                        </Link>
                        <Link
                          href={`/preview?scenario=${featured.scenario_id}`}
                          className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
                        >
                          <span className="material-symbols-outlined">info</span>
                          View Module Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Remaining scenarios */}
              {rest.length > 0 && (
                <section>
                  <div className="mb-8">
                    <h3 className="text-2xl text-primary font-bold font-display">
                      Learning Path Modules
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                      Expand your expertise across academic leadership contexts.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((scenario) => (
                      <ScenarioCard
                        key={scenario.scenario_id}
                        scenarioId={scenario.scenario_id}
                        title={scenario.title}
                        difficulty={scenario.difficulty_level}
                        time={`${scenario.estimated_minutes ?? 10}m`}
                        description={scenario.barrier_theme}
                        adversaryRole={scenario.adversary_role}
                        href={`/preview?scenario=${scenario.scenario_id}`}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
