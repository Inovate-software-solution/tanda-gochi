import React, { useState, useEffect } from "react";
import Item from "./Item.jsx";
import Alert from "./Alert.jsx"

const Inventory = (props) => {
  const [itemsToDisplay, setItemsToDisplay] = useState({
    items: [],
    outfits: [],
    toys: []
  });
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEating, setIsEating] = useState(false);
  
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertText, setAlertText] = useState("");

  const baseURL = process.env.BACKEND_API;
  const [token, setToken] = useState("");
  
  //helper functions
  const renderShopItem = (item, type) => {
    let baseURL = "https://capstone.marcusnguyen.dev/api/public/uploads/";
    let imageURL;
    let handleClick;

    switch(type) {
        case 'items':
            imageURL = `${baseURL}items/${item.ImageURL}`;
            handleClick = () => buyFood(item._id, item.Price);
            break;
        case 'outfits':
            imageURL = `${baseURL}outfits/${item.ImageURL}`;
            handleClick = () => buyOutfit(item._id, item.Price);
            break;
        case 'toys':
            imageURL = `${baseURL}toys/${item.ImageURL}`;
            handleClick = () => buyToy(item._id, item.Price);
            break;
        default:
            return null;
    }
    return (
        <Item
          type={"shop"}
          key={item._id}
          image={imageURL}
          name={item.Name}
          price={item.Price}
          onClick={handleClick}
        />
    );
  }

  const renderInventoryItem = async (item) => {
    let handleClick;
    let path;
    let route;
    let fetchedItem;

    switch(props.typeProp) {
        case "Food":
          path = "items"
          route = "ItemId";
          handleClick = () => {
            consumeFood(item.ItemId, item.Quantity);
          };
          break;
        case "Toys":
          path = "toys"
          route = "ToyId";
          handleClick = () => {
            props.startPlayAnimation();
            props.interactWithPet();
          };
          break;
        case "Outfits":
          path = "outfits"
          route = "OutfitId";
          handleClick = () => {
            props.startWearHatAnimation();
            equipOutfit(item.OutfitId);
          };
          break;
        default:
            return null;
    }

    try {
      const response = await fetch(`${baseURL}/${path}/${item[route]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      fetchedItem = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch for item with ID: ${item[route]}`);
      }

      setFetchedItems(prevItems => [...prevItems, {
        id: fetchedItem._id,
        image: `${baseURL}/public/uploads/${path}/${fetchedItem.ImageURL}`,
        name: fetchedItem.Name,
        type: path,
        quantity: item.Quantity,
        description: fetchedItem.Description,
        onClick: handleClick,
      }]);
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
    console.log('Type:123', path);
    console.log('TypeProp:', props.typeProp);

    return (
        <Item
          key={fetchedItem._id}
          image={`${baseURL}${props.typeProp.toLowerCase()}/${fetchedItem.ImageURL}`}
          name={fetchedItem.Name}
          quantity={item.Quantity}
          description={fetchedItem.Description}
          type={"test"}
          onClick={handleClick}
        />
    );
  }

  useEffect(() => {
    if(props.typeProp !== "Shop") {
      setFetchedItems([]);
      
      Object.keys(itemsToDisplay).forEach(key => {
        if (itemsToDisplay[key] && Array.isArray(itemsToDisplay[key])) {
          itemsToDisplay[key].forEach(item => {
            renderInventoryItem(item);
          });
        }
      });
    }
  }, [itemsToDisplay]);
  
  // Load items to display based on which button was pressed
  useEffect(() => {

    const fetchData = async () => {
      if (props.typeProp === "Shop") {
        setIsLoading(true);
        try {
          const config = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
          };

          const [itemsData, outfitsData, toysData] = await Promise.all([
              fetch(process.env.BACKEND_API + "/items", config).then((res) => res.json()),
              fetch(process.env.BACKEND_API + "/outfits", config).then((res) => res.json()),
              fetch(process.env.BACKEND_API + "/toys", config).then((res) => res.json())
          ]);

          setItemsToDisplay({
            items: itemsData,
            outfits: outfitsData,
            toys: toysData
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setItemsToDisplay({
          items: props.typeProp === "Food" ? props.userData.Inventory : [],
          outfits: props.typeProp === "Outfits" ? props.userData.OutfitsInventory : [],
          toys: props.typeProp === "Toys" ? props.userData.ToysInventory : []
        });
      }
    }

    const currentToken = sessionStorage.getItem('jwt');
    if (currentToken) {
      setToken(currentToken);
      fetchData();
    } else {
      console.error("No JWT token found in session storage.");
    }

  }, [props.typeProp, props.userData]);


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

      if (response.status === 403) {
        toggleAlert("You don't have any of this item left, please purchase more!")
        return;
      }
      props.interactWithPet();
      props.startEatAnimation();
      setIsLoading(false);

    } catch (error) {
      setError(error);
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
    if (price > props.Userdata.Credits) {
      toggleAlert("Not enough credits left");
    }

    try {
        const response = await fetch(baseURL + "/User/action/buy/item", {
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

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Server Response:", responseData);

    } catch (error) {
        setError(error);
        console.log(error);
    } finally {
        setIsLoading(false);
        console.log("bought food");
    }
  }


  async function buyOutfit(id, price) {
    if (price > props.userdata.Credits) {
      toggleAlert("Not enough credits left");
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Server Response:", responseData)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buyToy(id, price) {
    if (price > props.Userdata.Credits) {
      toggleAlert("Not enough credits left");
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Server Response:", responseData)
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
      console.log("bought toy");
      console.log(props.userData.Credits);
    }
  }

  const toggleAlert = (text) => {
    setAlertVisibility(true);
    setAlertText(text);
    
    setTimeout(() => {
      setAlertVisibility(false);
      setAlertText("");
    }, 2000);
    
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
                Credits: {props.userData.Credits}
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

        {!isLoading && (
          <div className="mt-3 p-2 h-48 overflow-y-scroll bg-blue-100 rounded-lg grid grid-cols-4 gap-2 place-items-center">
            {alertVisibility && 
              <Alert text={alertText}/>
            }
            {props.typeProp === "Shop" ? (
              Object.keys(itemsToDisplay).map(key => 
                (itemsToDisplay[key]?.length ? itemsToDisplay[key].map(
                  item => renderShopItem(item, key)
                ) : null)
              )
            ) : (
              fetchedItems.length > 0 ? (
                fetchedItems.map(item => <Item key={item.id} image={item.image} name={item.name} description={item.description} type={item.type} quantity={item.quantity} onClick={item.onClick} />)
              ) : (
                <Alert text={"No items yet ☹️. Earn some credits and spoil your pet with fun goodies!"}/>
              )
            )}
          </div>
        )}  
        </div>
      )}
    </div>
  );
};

export default Inventory;