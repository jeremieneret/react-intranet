import logo from './logo.svg';

function App() {
  return (
    <div className='bg-indigo-900 text-white min-h-screen flex flex-col justify-center'>
      <header className='text-center'>
        <img src={logo} alt='logo' className='m-auto max-w-2xl' />
        <p className='text-xl'>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a className='text-lg' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
