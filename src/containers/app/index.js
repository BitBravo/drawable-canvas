import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'

const App = () => (
  <div>
    <header class="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav class="f6 fw6 ttu tracked">
            <Link class="link dim white dib mr3" to="/">Home</Link>
            <Link class="link dim white dib mr3" to="/about-us">About</Link>
        </nav>
    </header>

    <main class="pa3 pa5-ns bt b--black-10 black-70 bg-white">
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App;