import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScheduleComponent = () => {
    const [scheduleResult, setScheduleResult] = useState('');
    const location = useLocation();

    const generateSchedule = () => {
        const params = new URLSearchParams(location.search);
        const subjects = JSON.parse(decodeURIComponent(params.get('subjects')));
        const professors = JSON.parse(decodeURIComponent(params.get('professors')));

        const findTeachersForSubjects = (subjects, teachers) => {
            let result = [];

            for (const subject of subjects) {
                let subjectInfo = {
                    subject: subject,
                    teachers: []
                };

                for (const teacher of teachers) {
                    if (teacher.canTeach.includes(subject.name)) {
                        subjectInfo.teachers.push(teacher);
                    }
                }

                if (subjectInfo.teachers.length > 0) {
                    result.push(subjectInfo);
                }
            }

            return result;
        };

        const generateSchedule6 = (subjectsData) => {
            const schedule = [];
            const teachersSchedules = {};

            for (const subjectInfo of subjectsData) {
                for (const teacher of subjectInfo.teachers) {
                    if (!teachersSchedules[teacher.name]) {
                        teachersSchedules[teacher.name] = teacher.availableSlots;
                    } else {
                        teachersSchedules[teacher.name] = teachersSchedules[teacher.name].concat(teacher.availableSlots);
                    }
                }
            }

            function isSlotAvailable(day, startTime, endTime) {
                for (const teacherName in teachersSchedules) {
                    const teacherSlots = teachersSchedules[teacherName];
                    for (const slot of teacherSlots) {
                        if (slot.day === day && slot.startTime <= startTime && slot.endTime >= endTime) {
                            return false;
                        }
                    }
                }
                return true;
            }

            function selectTeacher(teachers) {
                const randomIndex = Math.floor(Math.random() * teachers.length);
                return teachers[randomIndex];
            }

            function generateSubjectSchedule(subjectInfo) {
                const { subject, teachers } = subjectInfo;
                const { name, modulesPerWeek, priority } = subject;
                const selectedTeacher = selectTeacher(teachers);
                let modulesScheduled = 0;

                for (let i = 0; i < modulesPerWeek; i++) {
                    const priorityOffset = priority ? i * 0.01 : 0; // Offset de prioridad
                    const days = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
                    let remainingModules = modulesPerWeek - modulesScheduled;
                    let moduleDuration = remainingModules > 1 ? 3 : 2; // Ajuste de duración del módulo por semana

                    if (remainingModules === 2 && modulesScheduled === 1) {
                        moduleDuration = 1.5; // Si solo queda un módulo de 2 horas, reducimos la duración a 1.5 horas
                    }

                    for (const day of days) {
                        let startTime;
                        if (!priority) {
                            startTime = '12:00 PM'; // Si la materia no es prioritaria, comenzar después del mediodía
                        } else {
                            startTime = '07:30 AM'; // Si es prioritaria, comenzar por la mañana
                        }
                        const endTime = calculateEndTime(startTime, moduleDuration);

                        if (isSlotAvailable(day, startTime, endTime)) {
                            schedule.push({
                                subject: name,
                                teacher: selectedTeacher.name,
                                day: day,
                                startTime: startTime,
                                endTime: endTime,
                                priority: priority,
                                priorityOffset: priorityOffset
                            });
                            modulesScheduled++;
                            break;
                        }
                    }
                }
            }

            function calculateEndTime(startTime, duration) {
                const start = new Date(`January 1, 2000 ${startTime}`);
                const end = new Date(start.getTime() + (duration * 60 * 60 * 1000));
                return end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }

            for (const subjectInfo of subjectsData) {
                generateSubjectSchedule(subjectInfo);
            }

            return schedule;
        };

        const result = findTeachersForSubjects(subjects, professors);
        const generatedSchedule = generateSchedule6(result);
        setScheduleResult(generatedSchedule);
    };

    useEffect(() => {
        generateSchedule();
    }, [location]); // Se ejecuta cuando la ubicación cambia

    const handleSave = () => {
        downloadCsvFile(convertToCsv(scheduleResult), 'horario.csv');
    };

    const handleGenerateAgain = () => {
        generateSchedule(); // Llamada a la función para generar el horario nuevamente
    };

    // Función para descargar el contenido como un archivo CSV
    const downloadCsvFile = (content, filename) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    };

    // Función para convertir los datos en formato CSV
    const convertToCsv = (data) => {
        const csvRows = [];

        // Encabezado CSV
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Contenido CSV
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    // Estilos
    const containerStyle = {
        backgroundColor: '#2196F3',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const innerContainerStyle = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: 'fit-content'
    };

    const labelStyle = {
        color: '#2196F3',
        marginBottom: '20px',
        fontWeight: 'bold',
        display: 'block',
        fontSize: '24px'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '10px',
        textAlign: 'left'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left'
    };

    const buttonContainerStyle = {
        marginTop: '20px'
    };

    const buttonStyle = {
        padding: '14px 28px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px'
    };

    return (
        <div style={containerStyle}>
            <div style={innerContainerStyle}>
                <label style={labelStyle}>Horario</label>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Día</th>
                            <th style={thStyle}>Materia</th>
                            <th style={thStyle}>Profesor</th>
                            <th style={thStyle}>Hora de inicio</th>
                            <th style={thStyle}>Hora de finalización</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleResult ? (
                            scheduleResult.map((item, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{item.day}</td>
                                    <td style={tdStyle}>{item.subject}</td>
                                    <td style={tdStyle}>{item.teacher}</td>
                                    <td style={tdStyle}>{item.startTime}</td>
                                    <td style={tdStyle}>{item.endTime}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={tdStyle}>Cargando...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={buttonContainerStyle}>
                    <button
                        onClick={handleSave}
                        style={buttonStyle}
                    >
                        Guardar
                    </button>
                    <button
                        onClick={handleGenerateAgain}
                        style={buttonStyle}
                    >
                        Generar Nuevamente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleComponent;
