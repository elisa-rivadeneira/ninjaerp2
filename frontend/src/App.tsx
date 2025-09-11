import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MessageSquare, Bell, User, TrendingUp, Package, Zap, AlertTriangle, Eye, Settings } from 'lucide-react';

const NinjaERPDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [showAddInsumoModal, setShowAddInsumoModal] = useState(false);
  const [insumos, setInsumos] = useState([
    { codigo: 'INS-001', descripcion: 'Harina de Trigo Premium', categoria: 'Harinas', stock: 850, minimo: 200, estado: 'normal' },
    { codigo: 'INS-002', descripcion: 'Azúcar Refinada', categoria: 'Endulzantes', stock: 45, minimo: 100, estado: 'critico' },
    { codigo: 'INS-003', descripcion: 'Aceite Vegetal', categoria: 'Aceites', stock: 0, minimo: 50, estado: 'agotado' },
    { codigo: 'INS-004', descripcion: 'Sal Marina', categoria: 'Condimentos', stock: 300, minimo: 80, estado: 'normal' },
    { codigo: 'INS-005', descripcion: 'Levadura Seca', categoria: 'Fermentos', stock: 25, minimo: 30, estado: 'critico' }
  ]);
  const [newInsumo, setNewInsumo] = useState({
    codigo: '',
    descripcion: '',
    categoria: '',
    stock: 0,
    minimo: 0
  });

  // Datos mock realistas
  const realtimeMetrics = {
    revenue: { value: 125450, change: 12.3, trend: 'up' },
    stock: { value: 98.5, change: 2.1, trend: 'up' },
    orders: { value: 247, change: -3.2, trend: 'down' },
    prediction: { value: '+15%', confidence: 94 }
  };

  const stockData = [
    { name: 'Lun', stock: 95, prediction: 97 },
    { name: 'Mar', stock: 89, prediction: 94 },
    { name: 'Mie', stock: 96, prediction: 98 },
    { name: 'Jue', stock: 92, prediction: 95 },
    { name: 'Vie', stock: 98, prediction: 99 },
    { name: 'Sab', stock: 97, prediction: 98 },
    { name: 'Dom', stock: 94, prediction: 96 },
  ];

  const flowData = [
    { name: 'Almacén A', efficiency: 96 },
    { name: 'Almacén B', efficiency: 89 },
    { name: 'Almacén C', efficiency: 94 },
    { name: 'Producción', efficiency: 98 },
  ];

  const alerts = [
    { id: 1, message: 'Stock bajo detectado en Almacén B - Predicción IA', severity: 'warning' },
    { id: 2, message: 'Ruta de distribución optimizada (+12% eficiencia)', severity: 'success' },
    { id: 3, message: 'Patrón inusual en ventas detectado', severity: 'info' },
  ];

  // Menu items con sub-items
  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: TrendingUp
    },
    { 
      id: 'inventory', 
      name: 'Inventario', 
      icon: Package,
      subItems: [
        { id: 'inventory-overview', name: 'Resumen', icon: Eye },
        { id: 'maestro-insumos', name: 'Maestro de Insumos', icon: Package },
        { id: 'stock-movements', name: 'Movimientos', icon: TrendingUp }
      ]
    },
    { 
      id: 'sales', 
      name: 'Ventas', 
      icon: Eye
    },
    { 
      id: 'reports', 
      name: 'Reportes', 
      icon: Settings
    }
  ];

  // Función para manejar expansión de menús
  const toggleMenuExpansion = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Función para obtener el nombre de la sección activa
  const getActiveMenuName = () => {
    for (const item of menuItems) {
      if (item.id === activeMenu) return item.name;
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.id === activeMenu);
        if (subItem) return `${item.name} - ${subItem.name}`;
      }
    }
    return 'Dashboard';
  };

  // Función para determinar el estado del insumo
  const getInsumoStatus = (stock: number, minimo: number) => {
    if (stock === 0) return 'agotado';
    if (stock <= minimo) return 'critico';
    return 'normal';
  };

  // Función para agregar nuevo insumo
  const handleAddInsumo = () => {
    if (newInsumo.codigo && newInsumo.descripcion && newInsumo.categoria) {
      const estado = getInsumoStatus(newInsumo.stock, newInsumo.minimo);
      const nuevoInsumo = {
        ...newInsumo,
        estado
      };
      
      setInsumos([...insumos, nuevoInsumo]);
      setNewInsumo({
        codigo: '',
        descripcion: '',
        categoria: '',
        stock: 0,
        minimo: 0
      });
      setShowAddInsumoModal(false);
    }
  };

  // Función para cancelar y limpiar el modal
  const handleCancelAdd = () => {
    setNewInsumo({
      codigo: '',
      descripcion: '',
      categoria: '',
      stock: 0,
      minimo: 0
    });
    setShowAddInsumoModal(false);
  };

  // Solo actualizar tiempo cada 5 minutos para ahorrar recursos
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 300000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex">
      
      {/* Sidebar Menu */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-800/50 border-r border-green-500/30 flex flex-col`}>
        {/* Menu Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🥷</div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-green-400">NINJA<span className="text-blue-400">ERP</span></div>
                <div className="text-xs text-gray-400">v2.0 Pro</div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeMenu === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeMenu));
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedMenus[item.id];
              
              return (
                <li key={item.id}>
                  {/* Main Menu Item */}
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        toggleMenuExpansion(item.id);
                      } else {
                        setActiveMenu(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="font-medium flex-1 text-left">{item.name}</span>
                        {hasSubItems && (
                          <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                            →
                          </div>
                        )}
                        {isActive && !hasSubItems && (
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                      </>
                    )}
                  </button>

                  {/* Sub Items */}
                  {hasSubItems && isExpanded && sidebarOpen && (
                    <ul className="mt-2 ml-6 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        return (
                          <li key={subItem.id}>
                            <button
                              onClick={() => setActiveMenu(subItem.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                                activeMenu === subItem.id
                                  ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                                  : 'hover:bg-gray-700/30 text-gray-400 hover:text-white'
                              }`}
                            >
                              <SubIconComponent className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium flex-1 text-left">{subItem.name}</span>
                              {activeMenu === subItem.id && (
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
          >
            <div className={`transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}>
              ←
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header - Actualizado */}
        <header className="flex items-center justify-between p-6 bg-gray-800/30 border-b border-green-500/30">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold text-white">
              {getActiveMenuName()}
            </div>
            <div className="text-sm text-gray-400">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-green-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <User className="w-6 h-6 text-green-400" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeMenu === 'dashboard' && (
            <>
              {/* AI Chat Widget */}
              <div className="fixed top-24 right-6 z-50">
                <div className="bg-gray-800 border border-green-500/50 rounded-xl p-4 max-w-xs">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">IA Ninja Assistant</div>
                      <div className="text-sm text-white">¡Hola! Tu inventario está 98% optimizado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <main className="p-6 space-y-6">
                {/* Real-time Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-8 h-8 text-green-400" />
                      <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                        ▲ {realtimeMetrics.revenue.change}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${realtimeMetrics.revenue.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Revenue Today</div>
                  </div>

                  <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Package className="w-8 h-8 text-blue-400" />
                      <div className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                        ▲ {realtimeMetrics.stock.change}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {realtimeMetrics.stock.value}%
                    </div>
                    <div className="text-sm text-gray-400">Stock Efficiency</div>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Eye className="w-8 h-8 text-purple-400" />
                      <div className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                        LIVE
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {realtimeMetrics.orders.value}
                    </div>
                    <div className="text-sm text-gray-400">Active Orders</div>
                  </div>

                  <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="w-8 h-8 text-orange-400" />
                      <div className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">
                        AI {realtimeMetrics.prediction.confidence}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {realtimeMetrics.prediction.value}
                    </div>
                    <div className="text-sm text-gray-400">AI Prediction</div>
                  </div>
                </div>

                {/* Flow Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">🌊 Warehouse Flow</h3>
                        <div className="text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded">
                          Real-time
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        {flowData.map((item, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-2 rounded-lg flex items-center justify-center text-white font-bold border-2
                              ${index === 0 ? 'bg-green-500/20 border-green-500' : 
                                index === 1 ? 'bg-blue-500/20 border-blue-500' :
                                index === 2 ? 'bg-purple-500/20 border-purple-500' :
                                'bg-orange-500/20 border-orange-500'}`}
                            >
                              {item.efficiency}%
                            </div>
                            <div className="text-xs text-gray-400">{item.name}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-400">
                        Warehouse efficiency monitoring - Updated every 5 minutes
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">🎯 AI Alerts</h3>
                        <Settings className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="space-y-4">
                        {alerts.map((alert) => (
                          <div key={alert.id} className={`p-3 rounded-lg border ${
                            alert.severity === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                            alert.severity === 'success' ? 'bg-green-500/10 border-green-500/30' :
                            'bg-blue-500/10 border-blue-500/30'
                          }`}>
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                                alert.severity === 'warning' ? 'text-yellow-400' :
                                alert.severity === 'success' ? 'text-green-400' :
                                'text-blue-400'
                              }`} />
                              <div className="text-sm text-gray-300">{alert.message}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">📈 Stock Prediction</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={stockData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Area type="monotone" dataKey="stock" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">🏭 Warehouse Efficiency</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={flowData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Bar dataKey="efficiency" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">⚡ Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: '📦', label: 'New Stock Entry' },
                      { icon: '🚚', label: 'Create Transfer' },
                      { icon: '📊', label: 'Generate Report' },
                      { icon: '🤖', label: 'AI Optimization' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="p-4 rounded-xl bg-gray-700/50 border border-gray-600/30 text-center hover:bg-gray-600/50 transition-colors"
                      >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <div className="text-sm text-gray-300">{action.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </main>
            </>
          )}

          {/* Inventario Overview */}
          {activeMenu === 'inventory-overview' && (
            <main className="p-6">
              <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">📦 Resumen de Inventario</h2>
                <p className="text-gray-400 mb-6">Vista general del estado del inventario</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Total Productos</h3>
                    <div className="text-3xl font-bold text-white">1,247</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">En Stock</h3>
                    <div className="text-3xl font-bold text-white">98.5%</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Bajo Stock</h3>
                    <div className="text-3xl font-bold text-white">23</div>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* Maestro de Insumos */}
          {activeMenu === 'maestro-insumos' && (
            <main className="p-6">
              <div className="space-y-6">
                {/* Header con botón agregar */}
                <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">🧪 Maestro de Insumos</h2>
                      <p className="text-gray-400">Gestión completa de materias primas e insumos</p>
                    </div>
                    <button 
                      onClick={() => setShowAddInsumoModal(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
                    >
                      + Agregar Insumo
                    </button>
                  </div>
                  
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-blue-400 mb-1">Total Insumos</h3>
                      <div className="text-2xl font-bold text-white">342</div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-green-400 mb-1">Activos</h3>
                      <div className="text-2xl font-bold text-white">318</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-yellow-400 mb-1">Stock Crítico</h3>
                      <div className="text-2xl font-bold text-white">12</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-red-400 mb-1">Sin Stock</h3>
                      <div className="text-2xl font-bold text-white">3</div>
                    </div>
                  </div>
                </div>

                {/* Tabla de insumos */}
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Lista de Insumos</h3>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="Buscar insumo..." 
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                      <button className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:text-white">
                        🔍
                      </button>
                    </div>
                  </div>
                  
                  {/* Tabla */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Código</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Descripción</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Categoría</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock Actual</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock Mínimo</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Estado</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {insumos.map((insumo, index) => (
                          <tr key={index} className="hover:bg-gray-700/30">
                            <td className="py-3 px-4 text-white font-mono">{insumo.codigo}</td>
                            <td className="py-3 px-4 text-white">{insumo.descripcion}</td>
                            <td className="py-3 px-4 text-gray-300">{insumo.categoria}</td>
                            <td className="py-3 px-4 text-white font-semibold">{insumo.stock}</td>
                            <td className="py-3 px-4 text-gray-400">{insumo.minimo}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                insumo.estado === 'normal' ? 'bg-green-500/20 text-green-400' :
                                insumo.estado === 'critico' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {insumo.estado === 'normal' ? '✓ Normal' : 
                                 insumo.estado === 'critico' ? '⚠ Crítico' : '❌ Agotado'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="text-blue-400 hover:text-blue-300">✏️</button>
                                <button className="text-green-400 hover:text-green-300">📦</button>
                                <button className="text-red-400 hover:text-red-300">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* Stock Movements */}
          {activeMenu === 'stock-movements' && (
            <main className="p-6">
              <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">📊 Movimientos de Stock</h2>
                <p className="text-gray-400">Historial de entradas y salidas de inventario</p>
              </div>
            </main>
          )}

          {/* Inventario Content (backward compatibility) */}
          {activeMenu === 'inventory' && (
            <main className="p-6">
              <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">📦 Módulo de Inventario</h2>
                <p className="text-gray-400 mb-6">Gestión completa de inventarios y stock</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Total Productos</h3>
                    <div className="text-3xl font-bold text-white">1,247</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">En Stock</h3>
                    <div className="text-3xl font-bold text-white">98.5%</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Bajo Stock</h3>
                    <div className="text-3xl font-bold text-white">23</div>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* Ventas Content */}
          {activeMenu === 'sales' && (
            <main className="p-6">
              <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">💰 Módulo de Ventas</h2>
                <p className="text-gray-400">Panel de control de ventas y análisis</p>
              </div>
            </main>
          )}

          {/* Reportes Content */}
          {activeMenu === 'reports' && (
            <main className="p-6">
              <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">📊 Módulo de Reportes</h2>
                <p className="text-gray-400">Reportes y analytics avanzados</p>
              </div>
            </main>
          )}
        </div>
      </div>

      {/* Chat Button */}
      <button className="fixed bottom-6 right-6 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center z-50 hover:bg-green-500 transition-colors">
        <MessageSquare className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
      </button>

      {/* Modal para Agregar Insumo */}
      {showAddInsumoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-blue-500/30 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">🧪 Agregar Nuevo Insumo</h3>
              <button 
                onClick={handleCancelAdd}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              {/* Código */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Código *
                </label>
                <input
                  type="text"
                  value={newInsumo.codigo}
                  onChange={(e) => setNewInsumo({...newInsumo, codigo: e.target.value})}
                  placeholder="INS-006"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción *
                </label>
                <input
                  type="text"
                  value={newInsumo.descripcion}
                  onChange={(e) => setNewInsumo({...newInsumo, descripcion: e.target.value})}
                  placeholder="Nombre del insumo"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoría *
                </label>
                <select
                  value={newInsumo.categoria}
                  onChange={(e) => setNewInsumo({...newInsumo, categoria: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Harinas">Harinas</option>
                  <option value="Endulzantes">Endulzantes</option>
                  <option value="Aceites">Aceites</option>
                  <option value="Condimentos">Condimentos</option>
                  <option value="Fermentos">Fermentos</option>
                  <option value="Lácteos">Lácteos</option>
                  <option value="Proteínas">Proteínas</option>
                  <option value="Conservantes">Conservantes</option>
                </select>
              </div>
              
              {/* Stock Actual */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock Actual
                </label>
                <input
                  type="number"
                  value={newInsumo.stock}
                  onChange={(e) => setNewInsumo({...newInsumo, stock: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              {/* Stock Mínimo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock Mínimo
                </label>
                <input
                  type="number"
                  value={newInsumo.minimo}
                  onChange={(e) => setNewInsumo({...newInsumo, minimo: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </form>
            
            {/* Botones */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCancelAdd}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddInsumo}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NinjaERPDashboard;