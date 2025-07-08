import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { ConfirmModal } from './components/ConfirmModal';
import { DestinationForm } from './components/DestinationForm';
import { DestinationList } from './components/DestinationList';

export default function TravelApp() {
  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ country: '', description: '' });
  const [modal, setModal] = useState({ show: false, title: '', message: '', action: null });

  useEffect(() => { fetch('/api/destinations').then(r => r.json()).then(setDestinations).catch(console.error); }, []);
  useEffect(() => { fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(r => r.json())
      .then(data => setCountries(data.map(c => ({ code: c.cca2, name: c.name.common })).sort((a,b) => a.name.localeCompare(b.name))))
      .catch(() => setCountries([]));
  }, []);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...form, visited: false, timesVisited: 0 };
    fetch('/api/destinations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(r=>r.json()).then(nd=>setDestinations(prev=>[...prev,nd])).catch(console.error);
    setForm({ country:'',description:'' });
  };

  const confirmDelete = id => setModal({show:true,title:'Delete Entry',message:'Are you sure you want to delete this entry?',action:() =>{
      fetch(`/api/destinations/${id}`,{method:'DELETE'}).catch(console.error);
      setDestinations(prev=>prev.filter(d=>d.id!==id));
      setModal(m=>({...m,show:false}));
    }});

  const confirmVisit = countryCode => setModal({show:true,title:'Mark Visited',message:'Are you sure you want to mark this as visited?',action:()=>{
      const entries = destinations.filter(d=>d.country===countryCode);
      if(!entries.length) return;
      const [primary,...dups] = entries;
      const newCount=(primary.timesVisited||0)+1;
      const updated={...primary,visited:true,timesVisited:newCount};
      fetch(`/api/destinations/${primary.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(updated)}).catch(console.error);
      dups.forEach(d=>fetch(`/api/destinations/${d.id}`,{method:'DELETE'}).catch(console.error));
      setDestinations(prev=>[...prev.filter(d=>d.country!==countryCode),updated]);
      setModal(m=>({...m,show:false}));
    }});

  const upcoming = destinations.filter(d=>!d.visited);
  const visited = destinations.filter(d=>d.visited);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-800">Travel Destinations</h1>
            <nav className="mt-4 flex justify-center space-x-4">
              <NavLink to="/" end className={({isActive})=>isActive?'text-indigo-600 font-semibold':'text-gray-600'}>Add Destination</NavLink>
              <NavLink to="/upcoming" className={({isActive})=>isActive?'text-indigo-600 font-semibold':'text-gray-600'}>Upcoming Travels</NavLink>
              <NavLink to="/visited" className={({isActive})=>isActive?'text-indigo-600 font-semibold':'text-gray-600'}>Visited Countries</NavLink>
            </nav>
          </header>

          <ConfirmModal show={modal.show} title={modal.title} message={modal.message} onConfirm={modal.action} onCancel={()=>setModal(m=>({...m,show:false}))} />
          <Routes>
            <Route path="/" element={<DestinationForm form={form} countries={countries} handleChange={handleChange} handleSubmit={handleSubmit} />} />
            <Route path="/upcoming" element={<DestinationList title="Upcoming Travels" list={upcoming} onDeleteClick={confirmDelete} onVisitClick={confirmVisit} cardBg="bg-white" showToggle />} />
            <Route path="/visited" element={<DestinationList title="Visited Countries" list={visited} onDeleteClick={confirmDelete} cardBg="bg-green-50" />} />
            <Route path="*" element={<Navigate to="/upcoming" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}