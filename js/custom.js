// Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar')

    const rawEvents = [
        {
            id: '1',
            resourceId: '1',
            start: '2025-09-21',
            end: '2025-09-24',
            title: '100 ANOS DE DALVA DE OLIVEIRA',
            color: 'orange'
        },
        {
            id: '2',
            resourceId: '1',
            start: '2025-09-24',
            end: '2025-09-25',
            title: '1° SEMINÁRIO DE SAÚDE E EDUCAÇÃO',
            color: 'red'
        },
        {
            id: '3',
            resourceId: '2',
            start: '2025-09-26',
            end: '2025-09-27',
            title: '22 MOSTRA ALAGOANA DE DANÇA',
            color: 'blue'
        },
        {
            id: '4',
            resourceId: '2',
            start: '2025-09-28',
            end: '2025-09-29',
            title: 'EVENTOS RJ LTDA TESTE',
            color: 'blue'
        },
        {
            id: '5',
            resourceId: '3',
            start: '2025-09-30',
            end: '2025-07-30',
            title: 'GRAVAÇÃO INOVATECH',
            color: 'blue'
        }
    ]

    const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,dayGridMonth,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        initialView: 'resourceTimelineMonth',
        initialDate: '2025-09-17',
        selectable: true,
        editable: true,
        height: 'auto',
        firstDay: 1,
        resourceAreaHeaderContent: 'Espaços',
        resourceAreaWidth: '10%',
        locale: 'pt-br',
        slotLabelFormat: [{ weekday: 'short' }, { day: 'numeric' }],

        resources: [
            {
                id: 'categoria-a',
                title: 'Salas Frutas',
                children: [
                    { id: '1', title: 'Espaço A' },
                    { id: '2', title: 'Espaço B' }
                ]
            },
            {
                id: 'categoria-b',
                title: 'Praias',
                children: [
                    { id: '3', title: 'Espaço C' },
                    { id: '4', title: 'Espaço D' }
                ]
            },
            {
                id: 'categoria-c',
                title: 'Auditório',
                children: [
                    { id: '5', title: 'Espaço E' },
                    { id: '6', title: 'Espaço F' },
                    { id: '7', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-d',
                title: 'Hall',
                children: [
                    { id: '8', title: 'Espaço E' },
                    { id: '9', title: 'Espaço F' },
                    { id: '10', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-e',
                title: 'Teatro',
                children: [
                    { id: '11', title: 'Espaço E' },
                    { id: '12', title: 'Espaço F' },
                    { id: '13', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-f',
                title: 'Lanchonete',
                children: [
                    { id: '14', title: 'Espaço E' },
                    { id: '15', title: 'Espaço F' },
                    { id: '16', title: 'Espaço G' }
                ]
            }
        ],

        events: rawEvents,


    })

    calendar.render()
});