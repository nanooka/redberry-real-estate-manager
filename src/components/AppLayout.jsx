import Header from "./Header";

function AppLayout({ children }) {
  return (
    <div className="font-fira">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default AppLayout;
