import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft, Star, Plus, Minus, X, Coffee, Utensils, Zap, Award, ArrowRight, Check, User, Phone, Sparkles } from 'lucide-react';

// --- Mock Data ---

const CATEGORIES = [
  { id: 'best_seller', name: 'Best Sellers', icon: <Zap size={18} /> },
  { id: 'premium', name: 'Premium Series', icon: <Star size={18} /> },
  { id: 'food', name: 'Pastry & Food', icon: <Utensils size={18} /> },
];

const MENU_ITEMS = [
  // --- BEST SELLERS (Smart Bar Compatible - Fast) ---
  {
    id: 1,
    categoryId: 'best_seller',
    name: 'Signature Matcha Latte',
    description: 'Our classic blend. Freshly whisked ceremonial grade matcha with premium milk.',
    price: 32000, 
    // Classic Iced Green
    image: 'https://tse4.mm.bing.net/th?q=iced+matcha+latte+plastic+cup&w=500&h=500&c=7', 
    tags: ['Best Seller', 'Smart Bar'],
    method: 'smart_bar',
    customizable: true,
  },
  {
    id: 2,
    categoryId: 'best_seller',
    name: 'Matcha Macchiato',
    description: 'A delicate balance of matcha and macchiato foam. Creamy and intense.',
    price: 34000, 
    // Layered Green/White
    image: 'https://tse3.mm.bing.net/th?q=matcha+macchiato+drink&w=500&h=500&c=7', 
    tags: ['Creamy', 'Smart Bar'],
    method: 'smart_bar',
    customizable: true,
  },
  {
    id: 3,
    categoryId: 'best_seller',
    name: 'Cream Cheese Overdose',
    description: 'Signature matcha topped with thick savory cream cheese foam.',
    price: 38000,
    // Thick White Foam Top
    image: 'https://tse1.mm.bing.net/th?q=cheese+foam+matcha+tea&w=500&h=500&c=7', 
    tags: ['Savory Sweet', 'Smart Bar'],
    method: 'smart_bar',
    customizable: true,
  },
  {
    id: 4,
    categoryId: 'best_seller',
    name: 'Strawberry Matcha',
    description: 'Sweet house-made strawberry puree layered with fresh matcha milk.',
    price: 34000, 
    // Pink Bottom, Green Top
    image: 'https://tse2.mm.bing.net/th?q=strawberry+matcha+latte+layers&w=500&h=500&c=7', 
    tags: ['Fruity', 'Smart Bar'],
    method: 'smart_bar',
    customizable: true,
  },
  {
    id: 5,
    categoryId: 'best_seller',
    name: 'Tropical Lemonade Matcha',
    description: 'Refreshing zesty lemonade topped with a shot of premium matcha.',
    price: 32000, 
    // Yellow/Green Gradient
    image: 'https://tse1.mm.bing.net/th?q=iced+matcha+lemonade&w=500&h=500&c=7', 
    tags: ['Refreshing', 'Smart Bar'],
    method: 'smart_bar',
    customizable: true,
  },

  // --- PREMIUM SERIES (Manual Whisk Only - Slow/Artisan) ---
  {
    id: 101,
    categoryId: 'premium',
    name: 'Koku Matcha Latte',
    description: 'Prime Takumi Harvest. Elegant harmony of umami richness and natural sweetness.',
    price: 62000,
    // Dark Rich Green, Ceramic Cup
    image: 'https://tse4.mm.bing.net/th?q=hot+matcha+latte+art+ceramic+cup&w=500&h=500&c=7',
    tags: ['Prime Harvest', 'Hand Whisked'],
    method: 'manual',
    customizable: true,
  },
  {
    id: 102,
    categoryId: 'premium',
    name: 'Koku Usucha',
    description: 'Pure thin tea. The truest expression of Takumi Harvest. Intense umami.',
    price: 58000,
    // Pure Tea Bowl
    image: 'https://tse2.mm.bing.net/th?q=matcha+tea+ceremony+bowl&w=500&h=500&c=7',
    tags: ['Pure Tea', 'Hand Whisked'],
    method: 'manual',
    customizable: false,
  },
  {
    id: 103,
    categoryId: 'premium',
    name: 'Nagomi Matcha Latte',
    description: 'Delicate nori aroma, robust umami, silky-smooth texture.',
    price: 52000,
    // Soft Latte Art
    image: 'https://tse3.mm.bing.net/th?q=matcha+latte+art+heart&w=500&h=500&c=7',
    tags: ['Silky Smooth', 'Hand Whisked'],
    method: 'manual',
    customizable: true,
  },
  {
    id: 104,
    categoryId: 'premium',
    name: 'Nagomi Usucha',
    description: 'Pure thin tea. Robust umami with a silky texture.',
    price: 49000,
    // Clear Glass Pure Green
    image: 'https://tse4.mm.bing.net/th?q=cold+brew+matcha+glass&w=500&h=500&c=7',
    tags: ['Pure Tea', 'Hand Whisked'],
    method: 'manual',
    customizable: false,
  },

  // --- FOOD ---
  {
    id: 6,
    categoryId: 'food',
    name: 'Matcha Mille Crepe',
    description: '20 layers of delicate crepe with matcha cream.',
    price: 38000,
    // Green Layer Cake
    image: 'https://tse2.mm.bing.net/th?q=matcha+mille+crepe+cake+slice&w=500&h=500&c=7',
    tags: ['Perfect Pairing'], 
    customizable: false,
  },
  {
    id: 7,
    categoryId: 'food',
    name: 'Croffle Original',
    description: 'Crispy croissant waffle with maple syrup.',
    price: 25000, 
    // Waffle
    image: 'https://tse3.mm.bing.net/th?q=croffle+plain&w=500&h=500&c=7',
    tags: [],
    customizable: false,
  },
];

const CUSTOMIZATIONS = {
  milk: [
    { id: 'dairy', name: 'Dairy Milk', price: 0 },
    { id: 'oat', name: 'Oat Milk', price: 8000 },
    { id: 'almond', name: 'Almond Milk', price: 8000 },
  ],
  sugar: [
    { id: '100', name: 'Normal (100%)', price: 0 },
    { id: '75', name: 'Less (75%)', price: 0 },
    { id: '50', name: 'Half (50%)', price: 0 },
    { id: '0', name: 'No Sugar (0%)', price: 0 },
  ],
  strength: [
    { id: 'standard', name: 'Standard (2g)', price: 0, desc: 'Balanced' },
    { id: 'strong', name: 'Strong (3g)', price: 5000, desc: 'Extra Umami' },
  ],
};

// --- Main App Component ---

export default function FeelMatchaApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedCategory, setSelectedCategory] = useState('best_seller');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);
  const [user, setUser] = useState({ name: '', phone: '' });

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoyaltyPoints(150);
    setCurrentPage('menu');
  };

  const addToCart = (item, options, quantity) => {
    const newItem = {
      ...item,
      options,
      quantity,
      cartId: Date.now(),
      totalPrice: (item.price + (options?.milk?.price || 0) + (options?.strength?.price || 0)) * quantity,
    };
    setCart([...cart, newItem]);
    
    if (item.categoryId === 'best_seller' && !cart.some(i => i.categoryId === 'food')) {
      setShowUpsell(true);
    } else {
      setCurrentPage('menu');
    }
  };

  const handleUpsellAccept = () => {
    const milleCrepe = MENU_ITEMS.find(i => i.id === 6);
    const discountedItem = {
      ...milleCrepe,
      quantity: 1,
      cartId: Date.now(),
      totalPrice: milleCrepe.price - 5000,
      isPromo: true
    };
    setCart([...cart, discountedItem]);
    setShowUpsell(false);
    setCurrentPage('menu');
  };

  const placeOrder = () => {
    setCurrentPage('success');
    setLoyaltyPoints(prev => prev + Math.floor(cartTotal / 1000));
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col">
      {currentPage !== 'login' && (
        <div className="bg-white px-4 py-3 shadow-sm sticky top-0 z-10 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-2">
            {/* Header Text Only */}
            <div>
              <h1 className="font-bold text-lg leading-none text-green-900">FEEL MATCHA</h1>
              <p className="text-xs text-gray-500">Hi, {user.name.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
              <Award size={12} />
              <span className="text-xs font-bold">{loyaltyPoints} Pts</span>
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 ${currentPage === 'menu' ? 'pb-24' : ''} overflow-y-auto`}>
        {currentPage === 'login' && <LoginView onLogin={handleLogin} />}
        {currentPage === 'menu' && (
          <MenuView 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            onItemClick={(item) => {
              setSelectedItem(item);
              setCurrentPage('product');
            }}
          />
        )}
        {currentPage === 'product' && selectedItem && (
          <ProductDetailView 
            item={selectedItem}
            onClose={() => setCurrentPage('menu')}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'cart' && (
          <CartView 
            cart={cart}
            total={cartTotal}
            onBack={() => setCurrentPage('menu')}
            onPlaceOrder={placeOrder}
            setCart={setCart}
          />
        )}
        {currentPage === 'success' && (
          <SuccessView onHome={() => setCurrentPage('menu')} pointsEarned={Math.floor(cartTotal/1000)} />
        )}
      </div>

      {showUpsell && (
        <UpsellModal 
          onAccept={handleUpsellAccept} 
          onDecline={() => {
            setShowUpsell(false);
            setCurrentPage('menu');
          }} 
        />
      )}

      {currentPage === 'menu' && cart.length > 0 && (
        <div className="fixed bottom-0 max-w-md w-full p-4 bg-gradient-to-t from-white via-white to-transparent z-20">
          <button 
            onClick={() => setCurrentPage('cart')}
            className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex justify-between items-center active:scale-95 transition-transform"
          >
            <div className="flex items-center space-x-2">
              <div className="bg-green-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {cartCount}
              </div>
              <span>View Cart</span>
            </div>
            <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function LoginView({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const canSubmit = name.length > 0 && phone.length > 8;

  return (
    <div className="h-full flex flex-col justify-center items-center p-8 bg-white text-center">
      {/* Spacer for vertical centering, reduced top spacing since image is gone */}
      <div className="mb-10"></div>
      
      {/* Simple Text Logo - No Image */}
      <h1 className="text-4xl font-extrabold text-green-900 mb-2 tracking-tight">Feel Matcha Gang</h1>
      <p className="text-gray-500 mb-12 text-sm max-w-xs mx-auto">
        Join the community. Earn points. <br/> Drink premium matcha.
      </p>
      
      <div className="w-full space-y-4 mb-8">
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="tel" 
            placeholder="WhatsApp Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
          />
        </div>
      </div>
      <button 
        onClick={() => canSubmit && onLogin({ name, phone })}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${
          canSubmit ? 'bg-green-700 text-white shadow-green-700/30 hover:scale-105 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Start Ordering
      </button>
    </div>
  );
}

function MenuView({ selectedCategory, setSelectedCategory, onItemClick }) {
  return (
    <>
      {/* Logo Removed from Top of Menu */}
      <div className="mt-4"></div>

      {/* SMART BAR PROMO BANNER - NOW CLICKABLE */}
      <div className="px-4 mt-2">
        <div 
          onClick={() => setSelectedCategory('best_seller')}
          className="bg-green-900 rounded-xl p-4 text-white relative overflow-hidden shadow-lg cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">New Technology</span>
            </div>
            <h2 className="text-xl font-bold mb-1">Freshly Whisked in 15s</h2>
            <p className="text-sm text-green-100 opacity-90 mb-3 max-w-[70%]">Precision dosed by our Smart Bar. Available for Basic Menu.</p>
            <div className="inline-block bg-white text-green-900 text-xs font-bold px-3 py-1.5 rounded-full">
              Try Now
            </div>
          </div>
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-green-600 rounded-full opacity-50 blur-xl"></div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto px-4 space-x-3 my-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id 
                ? 'bg-green-700 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="px-4 grid gap-4">
        {MENU_ITEMS.filter(item => item.categoryId === selectedCategory).map(item => (
          <div 
            key={item.id} 
            onClick={() => onItemClick(item)}
            className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex space-x-3 active:bg-gray-50 transition-colors relative overflow-hidden"
          >
            {/* Tech Badge */}
            {item.method === 'smart_bar' && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg text-yellow-900 z-10 flex items-center shadow-sm">
                <Zap size={10} className="mr-1 fill-yellow-900" /> Smart Bar
              </div>
            )}
            
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 justify-between py-1">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight pr-4">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${
                        tag === 'Hand Whisked' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="font-bold text-green-800">Rp {item.price.toLocaleString('id-ID')}</span>
                <button className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProductDetailView({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState({
    milk: CUSTOMIZATIONS.milk[0],
    sugar: CUSTOMIZATIONS.sugar[0],
    strength: CUSTOMIZATIONS.strength[0],
  });

  const currentPrice = (item.price + options.milk.price + options.strength.price) * quantity;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <button 
        onClick={onClose}
        className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm text-gray-700"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="h-64 w-full bg-gray-200 flex-shrink-0 relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 -mt-6 relative">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">{item.description}</p>
          
          {/* METHOD INDICATOR - CRITICAL STRATEGY POINT */}
          <div className={`mt-4 flex items-center space-x-3 p-3 rounded-lg border ${
            item.method === 'smart_bar' 
              ? 'bg-yellow-50 border-yellow-100 text-yellow-900' 
              : 'bg-green-50 border-green-100 text-green-900'
          }`}>
            <div className={`p-2 rounded-full ${item.method === 'smart_bar' ? 'bg-yellow-100' : 'bg-green-100'}`}>
              {item.method === 'smart_bar' ? <Zap size={20} className="fill-yellow-600 text-yellow-600"/> : <User size={20} className="text-green-700"/>}
            </div>
            <div>
              <p className="font-bold text-sm">
                {item.method === 'smart_bar' ? 'Smart Bar Technology' : 'Artisanal Preparation'}
              </p>
              <p className="text-xs opacity-80">
                {item.method === 'smart_bar' 
                  ? 'Precision dosed. Whisked in 15s.' 
                  : 'Manually whisked by our Master Barista.'}
              </p>
            </div>
          </div>
        </div>

        {item.customizable && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-bold text-gray-900">Matcha Strength</label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.method === 'smart_bar' ? 'Auto-Dosed' : 'Hand-Scooped'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {CUSTOMIZATIONS.strength.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setOptions({ ...options, strength: opt })}
                    className={`flex justify-between items-center p-3 rounded-xl border text-left transition-all ${
                      options.strength.id === opt.id
                        ? 'border-green-600 bg-green-50 ring-1 ring-green-600'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div>
                      <div className={`font-semibold text-sm ${options.strength.id === opt.id ? 'text-green-900' : 'text-gray-700'}`}>{opt.name}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                    {opt.price > 0 && <span className="text-xs font-bold text-green-700">+Rp {opt.price.toLocaleString()}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-3">Milk Option</label>
              <div className="flex flex-wrap gap-2">
                {CUSTOMIZATIONS.milk.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setOptions({ ...options, milk: opt })}
                    className={`px-4 py-2 rounded-lg text-sm border font-medium ${
                      options.milk.id === opt.id
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {opt.name} {opt.price > 0 && `(+${opt.price/1000}k)`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-900 block mb-3">Sugar Level</label>
              <div className="grid grid-cols-4 gap-2">
                {CUSTOMIZATIONS.sugar.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setOptions({ ...options, sugar: opt })}
                    className={`py-2 rounded-lg text-xs font-bold border ${
                      options.sugar.id === opt.id
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {opt.name.split(' ')[0]}<br/>{opt.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg h-12">
            <button 
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
              className="w-10 h-full flex items-center justify-center text-gray-600"
            >
              <Minus size={18} />
            </button>
            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-full flex items-center justify-center text-gray-600"
            >
              <Plus size={18} />
            </button>
          </div>
          <button 
            onClick={() => onAddToCart(item, options, quantity)}
            className="flex-1 h-12 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl flex justify-between items-center px-6 transition-colors"
          >
            <span>Add to Order</span>
            <span>Rp {currentPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function UpsellModal({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl transform transition-all scale-100">
        <div className="h-32 bg-yellow-50 relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover opacity-90" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
             <div className="text-white">
               <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">LIMITED OFFER</span>
               <h3 className="font-bold text-lg leading-none">Perfect Pairing?</h3>
             </div>
           </div>
        </div>
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4">
            Add a <strong>Matcha Mille Crepe</strong> to your drink order and <strong>save Rp 5.000</strong>.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={onDecline}
              className="flex-1 py-3 text-gray-500 font-bold text-sm bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              No, thanks
            </button>
            <button 
              onClick={onAccept}
              className="flex-1 py-3 text-white font-bold text-sm bg-green-700 rounded-xl hover:bg-green-800 shadow-lg shadow-green-700/20"
            >
              Add (+33k)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartView({ cart, total, onBack, onPlaceOrder, setCart }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={onBack} className="mr-4 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-lg">My Order</h2>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {cart.map((item, idx) => (
          <div key={item.cartId} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
            <div className="flex space-x-3">
              <div className="bg-gray-100 w-12 h-12 rounded-lg text-green-800 font-bold flex items-center justify-center flex-shrink-0">
                {item.quantity}x
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                {item.customizable && (
                  <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                    <p>{item.options?.strength?.name}</p>
                    <p>{item.options?.milk?.name}</p>
                    <p>{item.options?.sugar?.name} Sugar</p>
                  </div>
                )}
                {item.isPromo && <span className="text-[10px] text-red-500 font-bold mt-1 block">Promo Applied</span>}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">Rp {item.totalPrice.toLocaleString()}</p>
              <button 
                onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                className="text-xs text-red-500 mt-2 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl">
          <div className="mb-4 space-y-2">
             <div className="flex justify-between text-sm text-gray-600">
               <span>Subtotal</span>
               <span>Rp {total.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-sm text-gray-600">
               <span>Tax (10%)</span>
               <span>Rp {(total * 0.1).toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
               <span>Total</span>
               <span>Rp {(total * 1.1).toLocaleString()}</span>
             </div>
          </div>
          
          <div className="mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Table Number</label>
            <input 
              type="text" 
              placeholder="e.g. 12" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button 
            onClick={onPlaceOrder}
            className="w-full bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg flex justify-between px-6 items-center"
          >
            <span>Pay & Order</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

function SuccessView({ onHome, pointsEarned }) {
  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-700 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="z-10 bg-white/10 backdrop-blur-md p-4 rounded-full mb-6 ring-4 ring-green-400/30">
        <Check size={48} className="text-green-300" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2 z-10">Order Sent!</h1>
      <p className="text-green-200 mb-8 z-10">Your order has been sent to the Smart Bar. It will be ready in approximately 2 minutes.</p>

      <div className="bg-white text-green-900 rounded-2xl p-6 w-full max-w-xs shadow-xl z-10">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">You Earned</p>
        <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-green-700 mb-4">
          <Star className="fill-green-700" />
          <span>+{pointsEarned} Pts</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-green-500 w-[70%]"></div>
        </div>
        <p className="text-xs text-gray-400">120 more points to next Reward</p>
      </div>

      <button 
        onClick={onHome}
        className="mt-12 text-sm font-bold text-green-200 hover:text-white transition-colors z-10"
      >
        Make Another Order
      </button>
    </div>
  );
}
