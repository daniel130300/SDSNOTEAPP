import Page from '../../shared/Page/Page';
import "./home.css"

const Home = ()=>{
  return (
    <Page showHeader title="My Notes V1">
      <section className="container">
        <span className="text1">Bienvenido a Nuestra App</span>
        <span className="text2">My Notes V1</span>
      </section>
    </Page>
  )
}

export default Home;
