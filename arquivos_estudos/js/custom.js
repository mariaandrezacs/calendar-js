// Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar')

    const rawEvents = [
        {
            id: '1',
            resourceId: '1',
            start: '2025-09-01',
            end: '2025-09-30',
            title: '100 ANOS DE DALVA DE OLIVEIRA',
            color: '#9C8BC9'

        },
        {
            id: '2',
            resourceId: '2',
            start: '2025-09-10',
            end: '2025-09-25',
            title: '1° SEMINÁRIO DE SAÚDE E EDUCAÇÃO',
            color: '#757575'
        },
        {
            id: '3',
            resourceId: '3',
            start: '2025-09-17',
            end: '2025-09-27',
            title: '22 MOSTRA ALAGOANA DE DANÇA',
            color: '#BF3030'
        },
        {
            id: '4',
            resourceId: '4',
            start: '2025-09-18',
            end: '2025-09-29',
            title: 'EVENTOS RJ LTDA TESTE',
            color: '#6AB8ED'
        },
        {
            id: '5',
            resourceId: '5',
            start: '2025-09-10',
            end: '2025-09-30',
            title: 'GRAVAÇÃO INOVATECH',
            color: '#497CA7'
        },
        {
            id: '6',
            resourceId: '6',
            start: '2025-09-01',
            end: '2025-09-16',
            title: 'GRAVAÇÃO INOVATECH',
            color: '#E6BD3E'
        },
    ]

    function criarEventoComDiarias(startDate, endDate, resourceId, title, color) {
        let end = new Date(endDate);
        end.setDate(end.getDate() + 1); // soma 1 dia para incluir o último
        return {
            resourceId,
            start: startDate,
            end: end.toISOString().split('T')[0], // formato YYYY-MM-DD
            allDay: true,
            title,
            color
        };
    }

    const evento = criarEventoComDiarias('2025-09-21', '2025-09-25', '1', '100 ANOS DE DALVA DE OLIVEIRA', 'orange');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev next today',
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
        resourceAreaWidth: '14%',
        locale: 'pt-br',

        // mostrar nome do evento simples
        // eventDidMount: function (info) {
        //     info.el.setAttribute("title", info.event.title);
        // },

        // mostra nome do evento melhor
        eventDidMount: function (info) {
            tippy(info.el, {
                content: info.event.title,
                theme: "light-border",
                placement: "top"
            });
        },

        // modal com mais informações
        // eventClick: function (info) {
        //     // Preenche o modal com os detalhes do evento
        //     document.getElementById('eventoModalLabel').innerText = info.event.title;
        //     document.getElementById('modalBody').innerHTML = `
        //         <p><strong>Início:</strong> ${info.event.start.toLocaleDateString()}</p>
        //         <p><strong>Fim:</strong> ${info.event.end ? info.event.end.toLocaleDateString() : '-'}</p>
        //         <p><strong>Descrição:</strong> ${info.event.extendedProps.descricao || 'Sem descrição'}</p>
        //         `;

        //     // Mostra o modal (Bootstrap 5)
        //     const modal = new bootstrap.Modal(document.getElementById('eventoModal'));
        //     modal.show();
        // },
        slotLabelFormat: [{ weekday: 'short' }, { day: 'numeric' }],

        resources: [
            {
                id: 'categoria-a',
                title: 'Salas Frutas',
                children: [
                    { id: '1', title: 'Sala Temática Mangaba' },
                    { id: '2', title: 'Sala Temática Pitanga' },
                    { id: '3', title: 'Sala Temática Siriguela' },
                    { id: '4', title: 'Sala Temática Tamarindo' },
                    { id: '5', title: 'Sala Temática Umbú' },
                ]
            },
            {
                id: 'categoria-b',
                title: 'Praias',
                children: [
                    { id: '6', title: 'Espaço C' },
                    { id: '7', title: 'Espaço D' }
                ]
            },
            {
                id: 'categoria-c',
                title: 'Auditório',
                children: [
                    { id: '8', title: 'Espaço E' },
                    { id: '9', title: 'Espaço F' },
                    { id: '10', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-d',
                title: 'Hall',
                children: [
                    { id: '11', title: 'Espaço E' },
                    { id: '12', title: 'Espaço F' },
                    { id: '13', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-e',
                title: 'Teatro',
                children: [
                    { id: '14', title: 'Espaço E' },
                    { id: '15', title: 'Espaço F' },
                    { id: '16', title: 'Espaço G' }
                ]
            },
            {
                id: 'categoria-f',
                title: 'Lanchonete',
                children: [
                    { id: '17', title: 'Espaço E' },
                    { id: '18', title: 'Espaço F' },
                    { id: '19', title: 'Espaço G' }
                ]
            }
        ],

        events: rawEvents,


    })

    calendar.render()
});