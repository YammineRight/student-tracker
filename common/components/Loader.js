const Loader = () => (
  <>
    <style jsx>
      {`
        .loader {
          width: 80px;
          height: 80px;
          animation: rotating 1s ease-in-out 0s normal infinite;
          stroke: black;
        }
        @keyframes rotating {
          0% {
            transform: rotate(0deg);
          }
        
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
    <svg className="loader" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1.66666C8.85186 1.66666 7.2407 2.1554 5.87029 3.07108C4.49988 3.98676 3.43177 5.28825 2.80104 6.81096C2.17031 8.33368 2.00529 10.0092 2.32683 11.6257C2.64837 13.2423 3.44204 14.7271 4.60748 15.8926C5.77292 17.058 7.25778 17.8517 8.87429 18.1732C10.4908 18.4947 12.1664 18.3297 13.6891 17.699C15.2118 17.0683 16.5133 16.0002 17.429 14.6297C18.3446 13.2593 18.8334 11.6482 18.8334 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </>
);

export default Loader;
