function Home() {
  return (
    <main className="main home">
      <Welcome />
      <HomeWidgets />
    </main>
  );
}

export default Home;

function Welcome() {
  return (
    <section className="welcome">
      <h1 className="ft-h1-regular">Welcome, Edwin</h1>
      <h2 className="ft-h2-regular clr--gray">
        You have <span className="clr--black">245,679</span> transaction that
        needs to be reconciled.
      </h2>
    </section>
  );
}

function HomeWidgets() {
  return (
    <section className="home-widget">
      <aside className="home-widget__recents">Recents</aside>
      <div className="home-widget__main">Main</div>
    </section>
  );
}
