export const metadata = {
  title: 'Mom Master Dashboard',
  description: 'Farah dashboard for tasks, schedule, projects, and groceries',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
