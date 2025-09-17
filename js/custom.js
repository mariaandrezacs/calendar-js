// Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'pt-br',
        initialDate: '2025-09-17',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        editable: true,
        dayMaxEvents: true,
        events: 'listar_eventos.py'
    });

    calendar.render();
});

// document.addEventListener('DOMContentLoaded', function () {
//     const calendarEl = document.getElementById('calendar')

//     const rawEvents = [
//         {
//             id: '1',
//             resourceId: '1',
//             start: '2025-09-21',
//             end: '2025-09-23',
//             title: 'PALESTRA',
//             color: 'orange'
//         },
//         {
//             id: '2',
//             resourceId: '1',
//             start: '2025-09-24',
//             end: '2025-09-25',
//             title: 'GOVERNAMENTAL',
//             color: 'red'
//         },
//         {
//             id: '3',
//             resourceId: '2',
//             start: '2025-09-26',
//             end: '2025-09-27',
//             title: 'GERAL',
//             color: 'blue'
//         },
//         {
//             id: '4',
//             resourceId: '2',
//             start: '2025-09-28',
//             end: '2025-09-29',
//             title: 'GERAL',
//             color: 'blue'
//         },
//         {
//             id: '5',
//             resourceId: '3',
//             start: '2025-09-30',
//             end: '2025-07-30',
//             title: 'GERAL',
//             color: 'blue'
//         }
//     ]

//     // Função para checar se dois eventos conflitam
//     function eventosConflitam(ev1, ev2) {
//         return ev1.resourceId === ev2.resourceId && new Date(ev1.start) < new Date(ev2.end) && new Date(ev2.start) < new Date(ev1.end)
//     }

//     // Marca eventos com conflito
//     const eventosComConflito = new Set()
//     for (let i = 0; i < rawEvents.length; i++) {
//         for (let j = i + 1; j < rawEvents.length; j++) {
//             if (eventosConflitam(rawEvents[i], rawEvents[j])) {
//                 eventosComConflito.add(rawEvents[i].id)
//                 eventosComConflito.add(rawEvents[j].id)
//             }
//         }
//     }

//     // Adiciona destaque visual nos eventos conflitantes
//     const eventosDecorados = rawEvents.map((evento) => {
//         if (eventosComConflito.has(evento.id)) {
//             return {
//                 ...evento,
//                 title: `⚠️ ${evento.title}`,
//                 message: 'Conflito',
//                 borderColor: 'black',
//                 textColor: 'black'
//             }
//         }
//         return evento
//     })

//     const calendar = new FullCalendar.Calendar(calendarEl, {
//         headerToolbar: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         locale: 'pt-br',
//         initialDate: '2025-09-17',
//         navLinks: true,
//         selectable: true,
//         selectMirror: true,
//         editable: true,
//         dayMaxEvents: true,

//         resources: [
//             {
//                 id: 'categoria-a',
//                 title: 'Salas Frutas',
//                 children: [
//                     { id: '1', title: 'Espaço A' },
//                     { id: '2', title: 'Espaço B' }
//                 ]
//             },
//             {
//                 id: 'categoria-b',
//                 title: 'Praias',
//                 children: [
//                     { id: '3', title: 'Espaço C' },
//                     { id: '4', title: 'Espaço D' }
//                 ]
//             },
//             {
//                 id: 'categoria-c',
//                 title: 'Auditório',
//                 children: [
//                     { id: '5', title: 'Espaço E' },
//                     { id: '6', title: 'Espaço F' },
//                     { id: '7', title: 'Espaço G' }
//                 ]
//             },
//             {
//                 id: 'categoria-d',
//                 title: 'Hall',
//                 children: [
//                     { id: '8', title: 'Espaço E' },
//                     { id: '9', title: 'Espaço F' },
//                     { id: '10', title: 'Espaço G' }
//                 ]
//             },
//             {
//                 id: 'categoria-e',
//                 title: 'Teatro',
//                 children: [
//                     { id: '11', title: 'Espaço E' },
//                     { id: '12', title: 'Espaço F' },
//                     { id: '13', title: 'Espaço G' }
//                 ]
//             },
//             {
//                 id: 'categoria-f',
//                 title: 'Lanchonete',
//                 children: [
//                     { id: '14', title: 'Espaço E' },
//                     { id: '15', title: 'Espaço F' },
//                     { id: '16', title: 'Espaço G' }
//                 ]
//             }
//         ],

//         events: eventosDecorados,

//         // 🔹 Marca sábados e domingos com classe extra
//         dayCellClassNames: function (arg) {
//             const day = arg.date.getDay() // 0 = domingo, 6 = sábado
//             if (day === 0 || day === 6) {
//                 return ['fc-weekend']
//             }
//             return []
//         },

//         eventDidMount: function (info) {
//             tippy(info.el, {
//                 content: info.events.title,
//                 theme: 'light'
//             })
//         }
//     })

//     calendar.render()
// });