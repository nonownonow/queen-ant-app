import React from 'react'

function BaseLoading () {
  return (
    <div id="init-loding">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        #init-loding {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.3);
          height: 100vh;
          width: 100vw;
        }
        .loading {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .loading div {
          display: inline-block;
          position: absolute;
          left: 8px;
          width: 16px;
          background-color: blueviolet;
          animation: loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        }
        .loading div:nth-child(1) {
          left: 8px;
          animation-delay: -0.24s;
        }
        .loading div:nth-child(2) {
          left: 32px;
          animation-delay: -0.12s;
        }
        .loading div:nth-child(3) {
          left: 56px;
          animation-delay: 0;
        }
        @keyframes loading {
          0% {
            top: 8px;
            height: 64px;
          }
          50%,
          100% {
            top: 24px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  )
}

export default BaseLoading
