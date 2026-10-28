import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryFilters, MenuGrid } from "../components/menu/Menu.jsx";
import { PageHeading } from "../components/common/UI.jsx";
import useMenu from "../hooks/useMenu.js";

export default function MenuPage() {
  const { menu, loading, error } = useMenu();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filteredMenu = useMemo(() => menu.filter((item) => {
    const categoryMatches = category === "All" || item.category === category;
    return categoryMatches && item.name.toLowerCase().includes(search.trim().toLowerCase());
  }), [category, menu, search]);
  const popular = menu.filter((item) => item.popular);

  return (
    <>
      <section className="hero page-width" id="home">
        <div className="hero-copy"><p className="eyebrow"><span /> YOUR CAMPUS, YOUR COMFORT FOOD</p><h1>Delicious Food,<br />Right on <em>Campus!</em></h1><p className="hero-description">Fresh, tasty, and affordable meals for every student.</p><Link className="button button-primary" to="/#menu">Explore menu <span aria-hidden="true">↗</span></Link><p className="hero-note">✳ Made fresh. Priced fair.</p></div>
        <div className="hero-visual"><img src="/images/chicken-biryani.jpg" alt="A freshly prepared campus meal" /><div className="hero-badge">FRESH<br />ON CAMPUS</div></div>
      </section>
      <section className="popular-section" aria-labelledby="popular-title"><div className="page-width"><div className="section-heading"><div><p className="eyebrow">THE CROWD-PLEASERS</p><h2 id="popular-title">Popular <em>choices</em></h2></div><a className="text-link" href="#menu">See the whole menu →</a></div>{loading ? <p className="loading-state">Finding the favorites...</p> : <div className="popular-grid">{popular.map((item) => <article className="popular-card" key={item.id}><img src={item.image} alt={item.name} loading="lazy" /><div><span className="popular-label">Campus favorite</span><h3>{item.name}</h3><span className="price">Rs. {item.price}</span></div></article>)}</div>}</div></section>
      <section className="menu-section page-width" id="menu" aria-labelledby="menu-title">
        <div className="section-heading menu-heading"><PageHeading eyebrow="THE GOOD STUFF" title={<>What's <em>cooking?</em></>} description="A little something for every break, budget, and big appetite." /></div>
        <div className="menu-tools" id="categories"><CategoryFilters selected={category} onSelect={setCategory} /><label className="search-box"><span aria-hidden="true">⌕</span><span className="visually-hidden">Search menu</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your favorite..." /></label></div>
        {error ? <p role="alert" className="error-state">{error}</p> : loading ? <p className="loading-state">Loading the menu...</p> : <><p className="results-status" aria-live="polite">Showing {filteredMenu.length} {filteredMenu.length === 1 ? "item" : "items"}</p><MenuGrid items={filteredMenu} /></>}
      </section>
      <section className="about-section" id="about"><div className="page-width about-inner"><div className="about-mark" aria-hidden="true">CB ✳</div><div className="about-copy"><p className="eyebrow">A TABLE FOR EVERY STUDENT</p><h2>Good food makes<br /><em>good campus days.</em></h2><p>Campus Bites is your friendly stop between classes. We serve fresh, satisfying favorites at prices that make sense for student life, with a warm welcome every time.</p></div><div className="hours-card"><p className="eyebrow">DROP BY FOR A BITE</p><h3>Opening hours</h3><p><strong>Monday – Saturday</strong><span>8:00 AM – 6:00 PM</span></p><p><strong>Sunday</strong><span>Taking a little rest</span></p></div></div></section>
    </>
  );
}