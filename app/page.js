'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [brainDumpInput, setBrainDumpInput] = useState('');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get current day section based on time
  const getDaySection = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 9) return 'Morning';
    if (hour >= 9 && hour < 15) return 'Day';
    if (hour >= 15 && hour < 18) return 'Afternoon';
    return 'Evening';
  };

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Today's anchors (the skeleton of the day)
  const anchors = [
    { time: '8:30', label: 'Drop-off (RMS)', completed: currentTime.getHours() >= 9 },
    { time: '10:00', label: 'Dr appointment', completed: currentTime.getHours() >= 11 },
    { time: '3:30', label: 'School pickup', completed: currentTime.getHours() >= 16 },
    { time: '5:30', label: 'Start dinner', completed: currentTime.getHours() >= 18 },
    { time: '8:15', label: 'Bedtime routine', completed: currentTime.getHours() >= 21 },
  ];

  // Must-do items
  const mustDoItems = [
    { id: 1, text: 'Call pediatrician', context: 'Daycare asked', time: 'Flexible' },
    { id: 2, text: 'Daycare forms + signature', context: 'Due by Friday', time: 'Before pickup' },
  ];

  // Should-do items
  const shouldDoItems = [
    { id: 1, text: 'Check Hamad\'s school paper' },
    { id: 2, text: 'Order next week\'s groceries', context: 'By Friday EOD' },
  ];

  // If-I-have-time items
  const optionalItems = [
    { id: 1, text: 'Work on dashboard project', time: '~60 min' },
    { id: 2, text: 'Organize photos', time: '~30 min' },
  ];

  // Get next anchor
  const getNextAnchor = () => {
    return anchors.find(a => !a.completed) || anchors[anchors.length - 1];
  };

  // Render Home tab with three-zone layout
  const renderHome = () => {
    const daySection = getDaySection();
    const nextAnchor = getNextAnchor();

    return (
      <div className={styles.homeContainer}>
        {/* ZONE 1: NOW */}
        <div className={styles.zoneNow}>
          <div className={styles.daySection}>{daySection}</div>
          <div className={styles.currentTime}>{formatTime(currentTime)}</div>
          <div className={styles.nowContent}>
            {daySection === 'Morning' && (
              <>
                <p className={styles.nowAction}>Getting ready for drop-off</p>
                <p className={styles.nextAction}>Next → 8:30 Leave for RMS</p>
              </>
            )}
            {daySection === 'Day' && (
              <>
                <p className={styles.nowAction}>Focus time available</p>
                <p className={styles.nextAction}>Next → {nextAnchor.time} {nextAnchor.label}</p>
              </>
            )}
            {daySection === 'Afternoon' && (
              <>
                <p className={styles.nowAction}>School activities</p>
                <p className={styles.nextAction}>Next → {nextAnchor.time} {nextAnchor.label}</p>
              </>
            )}
            {daySection === 'Evening' && (
              <>
                <p className={styles.nowAction}>Bedtime routine</p>
                <p className={styles.nextAction}>Next → {nextAnchor.time} {nextAnchor.label}</p>
              </>
            )}
          </div>
        </div>

        {/* ZONE 2: TODAY'S TIMELINE */}
        <div className={styles.zoneTimeline}>
          <h3 className={styles.zoneTitle}>Today's Day</h3>
          <div className={styles.timeline}>
            {anchors.map((anchor, idx) => (
              <div key={idx} className={`${styles.timelineItem} ${anchor.completed ? styles.completed : ''} ${anchor.time === nextAnchor.time ? styles.current : ''}`}>
                <span className={styles.time}>{anchor.time}</span>
                <span className={styles.label}>{anchor.label}</span>
                {anchor.completed && <span className={styles.checkmark}>✓</span>}
                {anchor.time === nextAnchor.time && <span className={styles.arrow}>→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ZONE 3: TODAY'S IMPORTANT THINGS */}
        <div className={styles.zoneImportant}>
          <div className={styles.taskSection}>
            <h3 className={styles.sectionTitle}>Must Do</h3>
            {mustDoItems.map(item => (
              <div key={item.id} className={styles.taskItem}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskContent}>
                  <p className={styles.taskText}>{item.text}</p>
                  {item.context && <p className={styles.taskContext}>{item.context} · {item.time}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.taskSection}>
            <h3 className={styles.sectionTitle}>Should Do</h3>
            {shouldDoItems.map(item => (
              <div key={item.id} className={styles.taskItem}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskContent}>
                  <p className={styles.taskText}>{item.text}</p>
                  {item.context && <p className={styles.taskContext}>{item.context}</p>}
                </div>
              </div>
            ))}
            <button className={styles.expandButton}>+ {optionalItems.length} more if I have time</button>
          </div>

          {/* Brain Dump */}
          <div className={styles.brainDump}>
            <input
              type="text"
              placeholder="What's on your mind?"
              value={brainDumpInput}
              onChange={(e) => setBrainDumpInput(e.target.value)}
              className={styles.brainDumpInput}
            />
            <div className={styles.brainDumpButtons}>
              <button className={styles.captureBtn}>Capture</button>
              <button className={styles.dumpBtn}>Brain Dump</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();

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
