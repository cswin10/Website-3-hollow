export default function ProductHeader({ visible = true }) {
  return (
    <header className={`product-header ${visible ? 'visible' : ''}`}>
      <h1 className="product-name">Hollow</h1>
      <p className="product-tagline">Beyond Protection</p>
    </header>
  );
}
