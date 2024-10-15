import React, { useState, useEffect } from 'react';

import "./Home.scss"
import Banner from '../Banner/Banner'
import sleva from "../../assets/svg/1.svg"
import prava from "../../assets/svg/2.svg"
import mainimage from "../../assets/image/mainimage.png"
import Like from "../../assets/svg/Like.svg"
import Like2 from "../../assets/svg/Like2.svg"
import x from "../../assets/svg/x.svg"
import Magazin from "../../assets/svg/magazin.svg"
import search from "../../assets/svg/search.svg"
import status1 from "../../assets/image/status1.png"
import status2 from "../../assets/image/status2.png"
import status3 from "../../assets/image/status3.png"
import status4 from "../../assets/image/status4.png"
import status5 from "../../assets/image/status5.png"
import status6 from "../../assets/image/status6.png"
import kros1 from "../../assets/image/kros1.png"
import kros2 from "../../assets/image/kros2.png"
import kros3 from "../../assets/image/kros3.png"
import kros4 from "../../assets/image/kros4.png"
import odezda from "../../assets/image/odezda.png"
import odezda2 from "../../assets/image/odezda2.png"
import odezda3 from "../../assets/image/odezda3.png"
import odezda4 from "../../assets/image/odezda4.png"
import odezda5 from "../../assets/image/odezda5.png"
import sleva1 from "../../assets/svg/sleva.svg"
import prava1 from "../../assets/svg/prava.svg"
import mixer1 from "../../assets/image/mixer1.png"
import mixer2 from "../../assets/image/mixer2.png"
import mixer3 from "../../assets/image/mixer3.png"
import spes from "../../assets/image/spes.png"
import custom1 from "../../assets/image/custom1.png"
import custom2 from "../../assets/image/custom2.png"
import catolog from "../../assets/image/catalog.png"
import catolog2 from "../../assets/image/catolog2.png"
import { useDispatch } from 'react-redux';
// import { addWish } from '../../redux/wishSlice';
import { addWish } from '../../redux/wish2/wishSlice';
import { Link, useNavigate } from 'react-router-dom';

const API = "https://66dfd7322fb67ac16f2740dd.mockapi.io/product"



function HomeCom() {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  

  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(100000); 

  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState({}); 

  const navigate = useNavigate(); 

  const handleMinChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilterClick = () => {
    const filtered = products.filter(item => item.price >= minPrice && item.price <= maxPrice);
    setFilteredProducts(filtered); 
  };
  const handleAvatarClick = (item) => {
    console.log('Clicked item:', item); 
    navigate('/obuv', { state: { selectedProduct: item } });
  };
  


  const getProduct = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleMagazinClick = () => {
    setModalVisible(true);
  };

  const handleCloseClick = () => {
    setModalVisible(false);
  };
  const toggleButton = (item) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(selectedItem => selectedItem !== item);
      }
      return [...prevSelected, item];
    });
  };
  const toggleLike = (item) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(selectedItem => selectedItem !== item);
      }
      dispatch(addWish(item)); 
      return [...prevSelected, item];
    });
  };
  
  const handleDelete = (item) => {
    setSelectedProducts((prevSelected) => 
      prevSelected.filter(selectedItem => selectedItem !== item)
    );
  };

  
  const handleCheckout = () => {
    const selectedQuantity = selectedProducts.filter(item => checkedItems[item.id]).length;
    navigate('/checkout', { state: { quantity: selectedQuantity } });
  };
  
  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item.id]: !prev[item.id], 
    }));
  };




  return (
    <div>
      <div className='top1'>
      <div className='top11'>
        <Link to={`/menuexpansion`}>
            <img src={sleva} alt="" />
        
        </Link>
            <p>Гарантия лучшей цены</p>
            <img src={prava} alt="" />
        </div>

      </div>
       
      <header className='header1 container  '>
          <img src={mainimage} alt="" />
          <div className='header1gg'>
          <div className='header1-left   '>
            <ul>
              <li>
                <Link to={`/`}>
                <a href="">Главная</a>
                </Link>
              </li>
              <li>
                <Link to={`/onas`}>
                <a href="">О нас</a>
                </Link>
              </li>
              <li>
                
              </li>
              <li>
                <Link to={`/istoriabrenda`}>
                <a href="">История </a>
                </Link>
              </li>
              <li>
                <Link to={`/proleved`}>
                <a href="">Proleved</a>
                </Link>
              </li>
              <li>
                <Link to={`/help`}>
                <a href="">Help</a>
              </Link>
              </li>
              <li>
                <Link to={`/0consignment`}>
                <a href="">Товары для спорта</a>
                </Link>
              </li>
              <p>DEALER</p>
            </ul>
          </div>
          <div className='header1-img'>
            <Link to={`/wishlist`}>
          <img src={Like} alt="" />
            </Link>
            <img src={Magazin} alt="" onClick={handleMagazinClick} /> 
            {isModalVisible && (
  <div className='icon2'>
    <div className='modal-nur'>
      <div className='modal2-nur'>
        <h2>Корзина</h2>
        <img src={x} alt="" onClick={handleCloseClick} />
      </div>
      <div className='m3-nur'>
        <h5>{selectedProducts.length} товара</h5>
        <h5 onClick={() => setSelectedProducts([])} style={{ cursor: 'pointer' }}>Очистить</h5>
      </div>
      <div className='selected-items'>
        {selectedProducts.map((item) => (
          <div key={item.id} className='selected-item'>
            <img src={item.avatar} alt={item.name} style={{ height: "160px", width: "200px" }} />
            <div>
              <p>{item.name}</p>
              <h5>{item.price}</h5>
              <input
                type="checkbox"
                checked={!!checkedItems[item.id]}
                onChange={() => handleCheckboxChange(item)}
              />
              <button onClick={() => handleDelete(item)} style={{width: "100px", borderRadius: "25px", marginLeft:"20px"}}>
                Delete
              </button>
            </div>
          </div>
          ))}
          </div>
          <div className='bm-nur'>
            <div className='bm2-nur'>
              <h2>Итого</h2>
            </div>
            <div className='btn-nur'>
              <Link to={`/oferzakaz`}>
              <button onClick={handleCheckout}>Оформить</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
        
                   <Link to={`/search`}>
              <img src={search} alt="" />
              </Link>
              </div>
              </div>
    
              <div className='header101-center'>
                <h1>распродажа <br />
                товаров для неё</h1>
                <Link to={`/catalog`}>
                <button>Перейти в каталог</button>
                </Link>
              </div>
    
             
          
            </header>
    
            <main className='main1 container'>
              <div className='main1-brend1'>
        <h1>Cамое популярное сейчас</h1>
        <button>Перейти</button>
              </div>
              <div className='main1-kros'>
              {
                products.slice(0, 24).map((item) => (
                  <div key={item.id} data={item}>
               <div className='kros1'>
                      <div className='mm'>
                      <img 
                          src={item.avatar} 
                          alt="" 
                          onClick={() => handleAvatarClick(item)} 
                        /> 
                      </div>
                      
                        
                      
                      <div className='pw1' >
                        <img src={Like2} onClick={() => toggleLike(item)} alt="" />
                      </div> 
                      <br />
                      <div className='main-top1'>
                        <p>{item.name}</p>
                        <h5>price: {item.price}</h5>
                      </div> 

                      <div>
                      <button style={{width: "250px", backgroundColor: "yellow", border:"none",}} onClick={() => toggleButton(item)}>add to cart</button>
                      </div>
                      
                    </div>
                  </div>
                ))   
              }
              </div>
             
    
    <div className='main1-brend1-2'>
        <h1>Новинки</h1>
        <button>Перейти</button>
              </div>
              <div className='main1-kros'>
              {
                products.slice(9, 24).map((item) => (
                  <div key={item.id} data={item}>
               <div className='kros1'>
                      <div className='mm'>
                      <img 
                          src={item.avatar} 
                          alt="" 
                          onClick={() => handleAvatarClick(item)} 
                        /> 
                      </div>
                      
                      
                      <div className='pw1' >
                        <img src={Like2} onClick={() => toggleLike(item)} alt="" />
                      </div> 
                      <br />
                      <div className='main-top1'>
                        <p>{item.name}</p>
                        <h5>price: {item.price}</h5>
                      </div> 

<div>
<button style={{width: "250px", backgroundColor: "yellow", border:"none",}} onClick={() => toggleButton(item)}>add to cart</button>
</div>

                    </div>
                  </div>
                ))   
              }
              </div>
              <div className='main1-odezda1'>
      <div className='odezda-1'>
        <img src={odezda} alt="" />
        <p>одежда</p>
      </div>
      <div className='odezda-1'>
        <img src={odezda2} alt="" />
        <p>обувь</p>
      </div>
      <div className='odezda-3'>
        <div className='odezda-3-1'>
          <img src={odezda3} alt="" />
          <p>аксессуары</p>
        </div>
        <div className='odezda-3-1'>
          <img src={odezda4} alt="" />
          <p>сумки</p>
        </div>
        <div className='odezda-3-1'>
          <img src={odezda5} alt="" />
          <p>для спорта</p>
        </div>
      </div>
      </div>

      <div className='main1-brend1-3'>
    <h1>Для вечерних прогулок</h1>
    <button>Перейти</button>
          </div>
          <div className='main1-kros'>
          
          {
            products.slice(5, 24).map((item) => (
              <div key={item.id} data={item}>
           <div className='kros1'>
                  <div className='mm'>
                  <img 
                      src={item.avatar} 
                      alt="" 
                      onClick={() => handleAvatarClick(item)} 
                    /> 
                  </div>
                  
                    
                  
                  <div className='pw1' >
                    <img src={Like2} onClick={() => toggleLike(item)} alt="" />
                  </div> 
                  <br />
                  <div className='main-top1'>
                    <p>{item.name}</p>
                    <h5>price: {item.price}</h5>
                  </div> 
                  <div>
                  <button style={{width: "250px", backgroundColor: "yellow", border:"none",}} onClick={() => toggleButton(item)}>add to cart</button>
                  </div>

                </div>
              </div>
            ))   
          }

</div>

      <div className='main1-Nike1'>
        <p>Взгляните на</p>
        <div className='Nike1'>
          <div className='Nike1-1'>
            <h2></h2>
            <img src={sleva1} alt="" />

          </div>
          <h1>NIKE</h1>


          <div className='Nike1-2'>
            <img src={prava1} alt="" />
            <h2></h2>

          </div>
        </div>
      </div>

      <div className='main-mixer'>

<div className='mixer1'>
  <img src={mixer1} alt="" />
  <p>bred Fr <br /> mixer </p>
  <div className='mixer1-img'>
    <img src={prava1} alt="" />
  </div>
</div>

<div className='mixer2'>
  <img src={mixer2} alt="" />
  <p>nike air <br /> jordan 1 </p>
  <div className='mixer1-img'>
    <img src={prava1} alt="" />
  </div>
</div>

<div className='mixer1'>
  <img src={mixer3} alt="" />
  <p> nike air <br /> Maximus </p>
  <div className='mixer1-img'>
    <img src={prava1} alt="" />
  </div>
</div>

      </div>

      <div className='main1-spes1'>
        <img src={spes} alt="" />
        <p>спецпредложения</p>
        <h1>Гарантия лучшей <br /> цены</h1>
      </div>
      <div className="main1-podbor1">
        <div className="price-range">
          <label>Цена</label>
          <div className="slider-container">
            <input
              type="range"
              id="rangeMin"
              min="0"
              max="100000"
              value={minPrice}
              step="100"
              onChange={handleMinChange}
            />
            <input
              type="range"
              id="rangeMax"
              min="0"
              max="100000"
              value={maxPrice}
              step="100"
              onChange={handleMaxChange}
            />
          </div>
          <div className="price-labels">
            <input
              type="text"
              id="minPrice"
              value={parseInt(minPrice).toLocaleString()}
              readOnly
            />
            <span>–</span>
            <input
              type="text"
              id="maxPrice"
              value={parseInt(maxPrice).toLocaleString()}
              readOnly
            />
            <span>₽</span>
          </div>
          <button onClick={handleFilterClick}>Подобрать</button>
        </div>

        <div className="main1-kros">
          {
            filteredProducts.slice(0, 24).map((item) => (
              <div key={item.id} data={item}>
                <div className="kros1">
                  <div className="mm">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      onClick={() => handleAvatarClick(item)}
                    />
                  </div>
                  <button
                    style={{ width: "250px", backgroundColor: "yellow", border: "none" }}
                    onClick={() => toggleButton(item)}
                  >
                    add to cart
                  </button>
                  <div className="pw1">
                    <img src={Like2} onClick={() => toggleLike(item)} alt="" />
                  </div>
                  <div className="main-top1">
                    <p>{item.name}</p>
                    <h5>price: {item.price}</h5>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
<div className='main1-custom1'>
  <h2>Особенные категории</h2>
      <div className='center-custom1'> 
      <div className='custom-1'>
        <img src={custom1} alt="" />
        <h4>закастомизируем ваш <br /> гардероб</h4>
        <h1>dealer.custom</h1>
        <p>смотреть</p>
      </div>
      <div className='custom-1'>
      <img src={custom2} alt="" />
        <h4>для тех, кто ценит <br /> осознанное потребление</h4>
        <h1>pre-loved by dealer</h1>
        <p>смотреть</p>
      </div>
      </div>
      </div>
   
      <div className='main1-brend1-new'>
    <h1>В наличии</h1>
    <button>Перейти</button>
          </div>
          <div className='main1-kros'>
          {
            products.slice(10, 24).map((item) => (
              <div key={item.id} data={item}>
           <div className='kros1'>
                  <div className='mm'>
                  <img 
                      src={item.avatar} 
                      alt="" 
                      onClick={() => handleAvatarClick(item)} 
                    /> 
                  </div>
                  
                    
                  
                  <div className='pw1' >
                    <img src={Like2} onClick={() => toggleLike(item)} alt="" />
                  </div> 
                  <br />
                  <div className='main-top1'>
                    <p>{item.name}</p>
                    <h5>price: {item.price}</h5>
                  </div> 
                  <div>
                  <button style={{width: "250px", backgroundColor: "yellow", border:"none",}} onClick={() => toggleButton(item)}>add to cart</button>
                  </div>
                </div>
              </div>
            ))   
          }

</div>

<div className='main1-catolog'>
  <img src={catolog} alt="" /> 
  <h1>Продай свою пару <br />
  вместе с нами</h1>
  <p>Реализуем позиции, которые <br /> потеряли актуальность в вашем гардеробе</p>
  <button>В каталог</button>
  </div>

  <div className='main1-catolog2'>
  <img src={catolog2} alt="" /> 
  <h1>Скидка 7%</h1>
  <p>Получите скидку 7% на первую покупку при подписке <br /> на наши эксклюзивные акции, обновления и новости</p>
  <div className='catolog2-input1'>
    <input type="text" placeholder='Ваш E-mail' />
  <button>Подписаться</button>
  </div>
  </div>

          

        </main>
    </div>
  )
}

export default HomeCom