'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className={styles.tabContent}>
            <h2>Morning Routine</h2>
            <div className={styles.taskList}>
              <div className={styles.task}>Hamad up & ready — 7:30am</div>
              <div className={styles.task}>Talal up & ready — 7:45am</div>
              <div className={styles.task}>RMS backpack ready — 8:00am</div>
              <div className={styles.task}>Yousef morning routine — 8:15am</div>
              <div className={styles.task}>Drop-off — 8:30am</div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className={styles.tabContent}>
            <h2>Kanban Board</h2>
            <div className={styles.kanban}>
              <div className={styles.column}>
                <h3>To Do</h3>
                <div className={styles.card}>Walgreens run</div>
                <div className={styles.card}>Daycare forms</div>
                <div className={styles.card}>Cleaner lady</div>
              </div>
              <div className={styles.column}>
                <h3>In Progress</h3>
                <div className={styles.card}>Harvest Fest planning</div>
                <div className={styles.card}>Mom's birthday</div>
              </div>
              <div className={styles.column}>
                <h3>Done</h3>
                <div className={styles.card}>Pay utilities</div>
                <div className={styles.card}>Yousef checkup</div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className={styles.tabContent}>
            <h2>Projects</h2>
            <div className={styles.projectList}>
              <div className={styles.project}>World Mastery Game</div>
              <div className={styles.project}>Islamic Explorer</div>
              <div className={styles.project}>Math Adventure</div>
              <div className={styles.project}>Teta's Kitchen Maqluba</div>
              <div className={styles.project}>Portfolio Launch</div>
              <div className={styles.project}>Cookbook Notes</div>
            </div>
          </div>
        );

      case 'grocery':
        return (
          <div className={styles.tabContent}>
            <h2>Grocery Lists</h2>
            <div className={styles.storeList}>
              <div className={styles.store}>
                <h3>Costco</h3>
                <div className={styles.item}>Diapers — Size 2</div>
                <div className={styles.item}>Almond milk</div>
                <div className={styles.item}>Organic pasta</div>
              </div>
              <div className={styles.store}>
                <h3>Trader Joe's</h3>
                <div className={styles.item}>Frozen pitas</div>
                <div className={styles.item}>Frozen hummus</div>
                <div className={styles.item}>Tahini</div>
              </div>
              <div className={styles.store}>
                <h3>Target</h3>
                <div className={styles.item}>Winter coats (kids)</div>
                <div className={styles.item}>Thermal layers</div>
              </div>
              <div className={styles.store}>
                <h3>Walmart</h3>
                <div className={styles.item}>Wipes</div>
                <div className={styles.item}>Tissues</div>
                <div className={styles.item}>Hand sanitizer</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mom's Master Dashboard</h1>
        <p className={styles.subtitle}>Oct 4 — Hamad 4.5 | Talal 3 | Yousef 6m</p>
      </header>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => setActiveTab('home')}
        >
          ☀️ Home
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.active : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📋 Schedule
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'projects' ? styles.active : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          🎯 Projects
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'grocery' ? styles.active : ''}`}
          onClick={() => setActiveTab('grocery')}
        >
          🛒 Grocery
        </button>
      </nav>

      <main className={styles.main}>
        {renderTabContent()}
      </main>

      <footer className={styles.footer}>
        <p>Updated Oct 4, 2026 — WorkWave starts Oct 26</p>
      </footer>
    </div>
  );
}
