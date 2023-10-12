import React, { useState, useEffect } from "react";
import Item from "./Item.jsx";
import Alert from "./Alert.jsx"

const Inventory = (props) => {
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEating, setIsEating] = useState(false);

  const [items, setItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [toys, setToys] = useState([]);
  
  const [alertVisibility, setAlertVisibility] = useState(false);

  const baseURL = process.env.BACKEND_API;

  // Load items to display based on which button was pressed
  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        console.error("No JWT token found in session storage.");
        return;
    }

    if (props.typeProp === "Food") {
      setItemsToDisplay(props.userData.inventory);
    } else if (props.typeProp === "Toys") {
      setItemsToDisplay(props.userData.toyInventory);
    } else if (props.typeProp === "Outfits") {
      setItemsToDisplay(props.userData.outfitInventory);
    } else if (props.typeProp === "Shop") {
      const config = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
      };

      Promise.all([
          fetch(process.env.BACKEND_API + "/items", config).then((res) => res.json()),
          fetch(process.env.BACKEND_API + "/outfits", config).then((res) => res.json()),
          fetch(process.env.BACKEND_API + "/toys", config).then((res) => res.json())
      ]).then(([itemsData, outfitsData, toysData]) => {
          setItems(itemsData);
          setOutfits(outfitsData);
          setToys(toysData);
      }).catch(error => {
          console.error("Error fetching data:", error);
      });
    }
  }, [
    props.typeProp,
    props.userData.inventory,
    props.userData.toyInventory,
    props.userData.outfitInventory
  ]);

  // for testing
  useEffect(() => {
    console.log(items);
    console.log(outfits);
    console.log(toys);
  }, [items, outfits, toys]);


  // #### TO-DO ###
  // Need to search the loaded items from database to be able to load them

  async function consumeFood(ItemId) {
    try {
      const response = await fetch(baseURL + "/User/action/use/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ItemId: ItemId,
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      props.feedPet();
      setIsLoading(false);
    }
  }

  async function equipOutfit(OutfitId) {
    try {
      const response = await fetch(baseURL + "/User/action/equip/outfit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          OutfitId: OutfitId,
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buyFood(id, price) {
    if (price > props.userData.Credits) {
      setAlertVisibility(true);
    
      setTimeout(() => {
        setAlertVisibility(false);
      }, 2000);
    }
    try {
      const response = await fetch(baseURL + "User/action/buy/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ItemId: id,
          Quantity: 1
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buyOutfit(id, price) {
    if (price > props.userData.Credits) {
      setAlertVisibility(true);
    
      setTimeout(() => {
        setAlertVisibility(false);
      }, 2000);
    }
    try {
      const response = await fetch(baseURL + "/User/action/buy/outfit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          OutfitId: id
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buyToy(id, price) {
    if (price > props.userData.Credits) {
      setAlertVisibility(true);
    
      setTimeout(() => {
        setAlertVisibility(false);
      }, 2000);
    }

    try {
      const response = await fetch(baseURL + "/User/action/buy/toy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ToyId: id
        }),
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center">
      {props.visibilityProp && (
        <div
          className="fixed bg-gray-50 p-4 rounded shadow-lg z-10"
          style={{
            top: "75%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            minWidth: "35vw",
            minHeight: "30vh",
          }}
        >
          <div className="flex justify-between flex-col md:flex-row">
            <h2 className="text-base font-bold md:text-base lg:text-lg xl:text-xl mb-4">
              {props.typeProp}
            </h2>
            {props.typeProp === "Shop" && (
              <div className="sm:text-sm md:text-base flex items-center">
                <img
                  src="/images/coinGold.png"
                  alt="Gold Coin"
                  width={30}
                  height={30}
                  style={{ marginRight: "10px" }}
                />
                Credits: {props.userData.credits}
              </div>
            )}
            <button
              className="btn btn-circle btn-outline"
              onClick={props.toggleProp}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isEating && (
            <div className="mt-3 p-2">
              {/* Show the eating animation for 3 seconds */}
              <img
                src="/images/eating.gif"
                alt="Eating"
                style={{ width: "100%", animationDuration: "3s" }}
              />
            </div>
          )}

          {isLoading && (
            <div className="alert alert-warning mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Loading Items...</span>
            </div>
          )}

          {!isLoading &&
            (itemsToDisplay ? (
              <div className="mt-3 p-2 h-48 overflow-y-scroll bg-blue-100 rounded-lg grid grid-cols-4 gap-2 place-items-center">
                {itemsToDisplay.map((item) => {
                  if (props.typeProp === "Food") {
                    return (
                      <Item
                        key={item.ItemId}
                        image={item.ImageURL}
                        name={item.ItemId}
                        quantity={item.Quantity}
                        onClick={() => {
                          props.startEatAnimation();
                          consumeFood(item.ItemId);
                        }}
                      />
                    );
                  } else if (props.typeProp === "Toys") {
                    return (
                      <Item
                        key={item.ToyId}
                        image={item.ImageURL}
                        name={item.ToyId}
                        onClick={() => {
                          props.startPlayAnimation();
                          props.playWithPet();
                        }}
                      />
                    );
                  } else if (props.typeProp === "Outfit") {
                    return (
                      <Item
                        key={item.OutfitId}
                        image={item.ImageURL}
                        name={item.OutfitId}
                        onClick={() => {
                          props.startWearHatAnimation();
                          equipOutfit(item.OutfitId);
                        }}
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <div className="mt-3 p-2 h-48 overflow-y-scroll bg-blue-100 rounded-lg grid grid-cols-4 gap-2 place-items-center">
                {alertVisibility && 
                  <Alert text={"Not enough credits left"}/>
                }
                {props.typeProp === "Shop" && items.map((item, index) => (
                  <Item
                    key={item._id}
                    image={"public/items/" + item.ImageURL}
                    name={item.Name}
                    price={item.Price}
                    onClick={() => buyFood(item._id, item.Price)}
                  />
                ))}
                {props.typeProp === "Shop" && outfits.map((item, index) => (
                  <Item
                    key={item._id}
                    image={"public/outfits/" + item.ImageURL}
                    name={item.Name}
                    price={item.Price}
                    onClick={() => buyOutfit(item._id, item.Price)}
                  />
                ))}
                {props.typeProp === "Shop" && toys.map((item, index) => (
                  <Item
                    key={item._id}
                    image={"public/toys/" + item.ImageURL}
                    name={item.Name}
                    price={item.Price}
                    onClick={() => buyToy(item._id, item.Price)}
                  />
                ))}
                {props.typeProp !== "Shop" && (
                  <Alert text={"No items yet ☹️. Earn some credits and spoil your pet with fun goodies!"}/>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
