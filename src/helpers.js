// export const renderDeck = ({
//       cardName: savedName,
//       cardDescription: savedDescription,
//       cardAttr1: savedAttr1,
//       cardAttr2: savedAttr2,
//       cardAttr3: savedAttr3,
//       cardAttr4: savedAttr4,
//       cardImage: savedImage,
//       cardRare: savedRare,
//       cardTrunfo: savedTrunfo,
//     },
//     index,
//   ) => (
//     <div key={ index } className="deck__card--container">
//       <Card
//         cardName={ savedName }
//         cardDescription={ savedDescription }
//         cardAttr1={ savedAttr1 }
//         cardAttr2={ savedAttr2 }
//         cardAttr3={ savedAttr3 }
//         cardAttr4={ savedAttr4 }
//         cardImage={ savedImage }
//         cardRare={ savedRare }
//         cardTrunfo={ savedTrunfo }
//       />
//       <button
//         data-testid="delete-button"
//         onClick={ () => this.handleRemoveBtn(index) }
//         className="remove__button"
//       >
//         <span className="material-symbols-outlined">
//           delete_forever
//         </span>
//       </button>
//     </div>
//   ),
