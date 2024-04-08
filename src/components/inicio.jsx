import React, { useState } from 'react';

const DataInputComponent = () => {
  const [subjectsInput, setSubjectsInput] = useState('');
  const [professorsInput, setProfessorsInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleLoadData = () => {
    // Verificar si ambos campos están vacíos
    if (subjectsInput.trim() === '' || professorsInput.trim() === '') {
      setShowWarning(true); // Mostrar ventana de advertencia
    } else {
      // Mostrar ventana de confirmación antes de cargar los datos
      setShowConfirmation(true);
    }
  };

  const handleConfirmLoad = () => {
    // Convertir los datos a cadena JSON para pasarlos como parámetros de URL
    const subjectsJson = encodeURIComponent(subjectsInput);
    const professorsJson = encodeURIComponent(professorsInput);

    // Navegar a la ruta /schedule con los datos como parámetros de URL
    window.location.href = `/schedule?subjects=${subjectsJson}&professors=${professorsJson}`;
  };

  const handleCancelLoad = () => {
    // Ocultar la ventana de advertencia y confirmación
    setShowWarning(false);
    setShowConfirmation(false);
  };

  // Estilos
  const containerStyle = {
    backgroundColor: '#2196F3',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const inputContainerStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const textareaStyle = {
    flex: '1',
    minHeight: '200px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '14px 28px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  };

  const warningModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const confirmationModalStyle = {
    ...warningModalStyle,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ color: '#2196F3', marginBottom: '10px', fontWeight: 'bold' }}>Materias:</label>
          <textarea
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            style={textareaStyle}
          />
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '100%' }}>
          <label style={{ color: '#2196F3', marginBottom: '10px', fontWeight: 'bold' }}>Profesores:</label>
          <textarea
            value={professorsInput}
            onChange={(e) => setProfessorsInput(e.target.value)}
            style={textareaStyle}
          />
        </div>
        <button
          onClick={handleLoadData}
          style={buttonStyle}
        >
          Cargar Datos
        </button>
      </div>
      {/* Ventana de advertencia */}
      {showWarning && (
        <div style={warningModalStyle}>
          <div style={modalContentStyle}>
            <p style={{ color: '#f00', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px' }}>Por favor, complete ambos campos.</p>
            <button onClick={handleCancelLoad} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Aceptar</button>
          </div>
        </div>
      )}
      {/* Ventana de confirmación */}
      {showConfirmation && (
        <div style={confirmationModalStyle}>
          <div style={modalContentStyle}>
            <p style={{ color: '#2196F3', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px' }}>¿Estás seguro de cargar los datos?</p>
            <div>
              <button onClick={handleConfirmLoad} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }}>Aceptar</button>
              <button onClick={handleCancelLoad} style={{ padding: '10px 20px', backgroundColor: '#ccc', color: '#666', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInputComponent;







/*

Hola desde mac os

Datos para probar:

Materias:

[ 
    { "id":1,"name": "Mathematics", "prerequisites": [], "modulesPerWeek": 3, "suggestedSemester": 1, "minimumStudents": 3, "priority":true},
    { "id":2,"name": "Physics", "prerequisites": ["Mathematics"], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 4 , "priority":true},
    { "id":3,"name": "Computer Science", "prerequisites": ["Mathematics"], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 3 , "priority":false},
    { "id":4,"name": "Chemistry", "prerequisites": ["Physics"], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 5 , "priority":false},
    { "id":5,"name": "Biology", "prerequisites": [], "modulesPerWeek": 2, "suggestedSemester": 1, "minimumStudents": 6 , "priority":true},
    { "id":6,"name": "History", "prerequisites": [], "modulesPerWeek": 2, "suggestedSemester": 1, "minimumStudents": 2 , "priority":true},
    { "id":7,"name": "English Literature", "prerequisites": [], "modulesPerWeek": 3, "suggestedSemester": 1, "minimumStudents": 4 , "priority":false},
    { "id":8,"name": "Economics", "prerequisites": [], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 3 , "priority":true},
    { "id":9,"name": "Psychology", "prerequisites": [], "modulesPerWeek": 2, "suggestedSemester": 1, "minimumStudents": 8 , "priority":false},
    { "id":10,"name": "Environmental Science", "prerequisites": [], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 8 , "priority":true},
    { "id":11,"name": "Magic", "prerequisites": ["Psychology"], "modulesPerWeek": 3, "suggestedSemester": 2, "minimumStudents": 8 , "priority":false}
]

Profesores:

[
    {
        "id":1,
        "name": "Dr. Smith",
        "canTeach": ["Mathematics", "Physics"],
        "availableSlots": [
            { "day": "Monday", "startTime": "09:00 AM", "endTime": "11:00 AM" },
            { "day": "Wednesday", "startTime": "02:00 PM", "endTime": "04:00 PM" },
            { "day": "Thursday", "startTime": "07:30 AM", "endTime": "10:00 AM" },
            { "day": "Saturday", "startTime": "06:00 PM", "endTime": "09:00 PM" }
        ]
    },
    {
        "id":2,
        "name": "Prof. Johnson",
        "canTeach": ["Computer Science", "Chemistry"],
        "availableSlots": [
            { "day": "Tuesday", "startTime": "10:00 AM", "endTime": "12:00 PM" },
            { "day": "Thursday", "startTime": "01:00 PM", "endTime": "03:00 PM" },
            { "day": "Friday", "startTime": "09:00 AM", "endTime": "12:00 PM" }
        ]
    },
    {
        "id":3,
        "name": "Dr. Davis",
        "canTeach": ["Biology", "History"],
        "availableSlots": [
            { "day": "Monday", "startTime": "01:00 PM", "endTime": "03:00 PM" },
            { "day": "Wednesday", "startTime": "10:00 AM", "endTime": "12:00 PM" }
        ]
    },
    {
        "id":4,
        "name": "Prof. White",
        "canTeach": ["English Literature", "Economics"],
        "availableSlots": [
            { "day": "Tuesday", "startTime": "11:00 AM", "endTime": "01:00 PM" },
            { "day": "Thursday", "startTime": "09:00 AM", "endTime": "11:00 AM" }
        ]
    },
    {
        "id":5,
        "name": "Dr. Robinson",
        "canTeach": ["Psychology", "Environmental Science"],
        "availableSlots": [
            { "day": "Friday", "startTime": "03:00 PM", "endTime": "05:00 PM" },
            { "day": "Monday", "startTime": "02:00 PM", "endTime": "04:00 PM" }
        ]
    },
    {
        "id":6,
        "name": "Prof. Hall",
        "canTeach": ["Mathematics", "Biology"],
        "availableSlots": [
            { "day": "Wednesday", "startTime": "09:00 AM", "endTime": "11:00 AM" },
            { "day": "Friday", "startTime": "02:00 PM", "endTime": "04:00 PM" }
        ]
    },
    {
        "id":7,
        "name": "Dr. Turner",
        "canTeach": ["Physics", "Computer Science"],
        "availableSlots": [
            { "day": "Tuesday", "startTime": "03:00 PM", "endTime": "05:00 PM" },
            { "day": "Thursday", "startTime": "01:00 PM", "endTime": "05:00 PM" }
        ]
    },
    {
        "id":8,
        "name": "Prof. Baker",
        "canTeach": ["Environmental Science", "Psychology"],
        "availableSlots": [
            { "day": "Monday", "startTime": "11:00 AM", "endTime": "01:00 PM" },
            { "day": "Wednesday", "startTime": "03:00 PM", "endTime": "05:00 PM" }
        ]
    },
    {
        "id":9,
        "name": "Dr. Adams",
        "canTeach": ["Chemistry", "Physics"],
        "availableSlots": [
            { "day": "Monday", "startTime": "08:00 AM", "endTime": "12:00 PM" },
            { "day": "Wednesday", "startTime": "01:00 PM", "endTime": "05:00 PM" }
        ]
    },
    {
        "id":10,
        "name": "Prof. Lee",
        "canTeach": ["Biology", "Environmental Science"],
        "availableSlots": [
            { "day": "Tuesday", "startTime": "10:00 AM", "endTime": "12:00 PM" },
            { "day": "Thursday", "startTime": "10:00 AM", "endTime": "03:00 PM" }
        ]
    }
]

*/