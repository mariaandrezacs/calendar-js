document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar')

    const rawEvents = 
    [
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
        {
            id: '7',
            resourceId: '1',
            start: '2025-09-15',
            end: '2025-09-22',
            title: 'GRAVAÇÃO INOVATECH',
            color: '#E6BD3E'
        },
        {
            id: '8',
            resourceId: '1',
            start: '2025-10-01',
            end: '2025-10-21',
            title: 'GRAVAÇÃO INOVATECH',
            color: '#3e52e6ff'
        }
    ]


    

    // --- Função para detectar conflitos ---
    function eventosConflitam(ev1, ev2) {
        return ev1.resourceId === ev2.resourceId &&
               new Date(ev1.start) < new Date(ev2.end) &&
               new Date(ev2.start) < new Date(ev1.end)
    }

    const eventosComConflito = new Set()
    for (let i = 0; i < rawEvents.length; i++) {
        for (let j = i + 1; j < rawEvents.length; j++) {
            if (eventosConflitam(rawEvents[i], rawEvents[j])) {
                eventosComConflito.add(rawEvents[i].id)
                eventosComConflito.add(rawEvents[j].id)
            }
        }
    }

    const eventosDecorados = rawEvents.map((evento) => {
        if (eventosComConflito.has(evento.id)) {
            return {
                ...evento,
                title: `⚠️ ${evento.title}`,
                message: 'Conflito',
                textColor: 'black'
            }
        }
        return evento
    })

    // --- Busca os resources da API ---
    async function carregarResources() {
        const response = await fetch("/cadastros/api/categorias/")
        const data = await response.json()

        return data.map(categoria => ({
            id: `categoria-${categoria.id}`,
            title: categoria.nome_categoria,
            children: categoria.espacos.map(espaco => ({
                id: espaco.id.toString(),
                title: espaco.nome
            }))
        }))
    }

    const resources = await carregarResources()

    // --- Cria o calendário apenas UMA vez ---
    const urlCadastrarEvento = "/eventos/evento/cadastrar/"

    const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: '',
            center: 'addEventButton monthNav customYear',
            right: ''
        },
        customButtons: {
            addEventButton: {
                text: '+ Novo Evento',
                click: function () {
                    window.location.href = urlCadastrarEvento
                }
            },
            monthNav: {
                text: '',
                click: function (e) {
                    const button = e.target
                    const rect = button.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const middle = rect.width / 2

                    if (clickX < middle) {
                        calendar.prev()
                    } else {
                        calendar.next()
                    }
                    atualizaMes()
                }
            },
            customYear: {
                text: '',
                click: function (e) {
                    const button = e.target
                    const rect = button.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const middle = rect.width / 2

                    const currentDate = calendar.getDate()
                    let newYear = currentDate.getFullYear()

                    if (clickX < middle) {
                        newYear -= 1
                    } else {
                        newYear += 1
                    }

                    const newDate = new Date(newYear, currentDate.getMonth(), 1)
                    calendar.gotoDate(newDate)
                    atualizaAno()
                }
            }
        },

        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        initialView: 'resourceTimelineMonth',
        initialDate: '2025-09-17',
        selectable: true,
        editable: true,
        height: 'auto',
        firstDay: 1,
        resourceAreaHeaderContent: 'ESPAÇOS',
        resourceAreaWidth: '16%',
        locale: 'pt-br',

        slotLabelFormat: [{ weekday: 'short' }, { day: 'numeric' }],
        resources: resources,
        events: eventosDecorados,

        dayCellClassNames: function (arg) {
            const day = arg.date.getDay()
            if (day === 0 || day === 6) {
                return ['fc-weekend']
            }
            return []
        },

        eventDidMount: function (info) {
            tippy(info.el, {
                content: info.event.title,
                theme: 'light'
            })
        }
    })

    function atualizaMes() {
        const currentDate = calendar.getDate()
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        const month = monthNames[currentDate.getMonth()]

        const button = document.querySelector('.fc-monthNav-button')
        if (button) {
            button.innerText = `< ${month} >`
        }
    }

    function atualizaAno() {
        const currentDate = calendar.getDate()
        const year = currentDate.getFullYear()

        const button = document.querySelector('.fc-customYear-button')
        if (button) {
            button.innerText = `< ${year} >`
        }
    }

    calendar.render()
    atualizaMes()
    atualizaAno()
})
