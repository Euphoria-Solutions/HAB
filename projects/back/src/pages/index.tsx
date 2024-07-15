const Index = () => {
  return (
    <div>
      Hello from hab backend API with
      {process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'} Environment
    </div>
  );
};

export default Index;
