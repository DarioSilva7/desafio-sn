export const Home = () => {
  window.localStorage.setItem("page", "/home");
  return (
    <>
      <div>
        <img
          src="https://github.com/org-sistemas-sn/desafio-tecnico/blob/advancedPlus/assets/repository-header.jpg?raw=true"
          alt="welcome"
        />
      </div>
    </>
  );
};
