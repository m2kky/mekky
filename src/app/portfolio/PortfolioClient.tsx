"use client";

import React from "react";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioBentoGrid from "@/components/portfolio/PortfolioBentoGrid";
import PortfolioStatement from "@/components/portfolio/PortfolioStatement";
import PortfolioCaseStudies from "@/components/portfolio/PortfolioCaseStudies";
import StatsSection from "@/components/StatsSection";
import styles from "./PortfolioClient.module.css";

export default function PortfolioClient() {
    return (
        <main className={styles.page}>
            {/* 1. Hook — Typography-heavy dark hero */}
            <PortfolioHero />

            {/* 2. Visual Proof — Bento grid of projects */}
            <PortfolioBentoGrid />

            {/* 3. Bold Statement CTA */}
            <PortfolioStatement />

            {/* 4. Deep Logic — Light mode case studies */}
            <PortfolioCaseStudies />

            {/* 5. Authority — Stats / "BUILD ENGINES" */}
            <StatsSection />
        </main>
    );
}
