document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar')

    async function carregarEventos() {
        const response = await fetch("/eventos/evento/eventos_dados_calendario/");
        const data = await response.json();
        return data.events;
    }

    const rawEvents = await carregarEventos();

    function eventosConflitam(evento1, evento2) {
        return evento1.resourceId === evento2.resourceId &&
            new Date(evento1.start) < new Date(evento2.end) &&
            new Date(evento2.start) < new Date(evento1.end)
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

    async function carregarResources() {
        try {
            const response = await fetch("/cadastros/categoria_espaco_dados_calendario/");
            if (!response.ok) {
                throw new Error(`Erro ao carregar resources: ${response.statusText}`);
            }

            const data = await response.json();

            return data.map((categoria) => ({
                id: `categoria-${String(categoria.id)}`,
                title: categoria.nome_categoria,
                children: (categoria.espacos || []).map((espaco) => ({
                    id: String(espaco.id),
                    title: espaco.nome
                }))
            }));
        } catch (error) {
            console.error("Falha ao carregar resources:", error);
            return [];
        }
    }

    const resources = await carregarResources()

    const resourcesDecorados = resources.map((categoria) => {
        const temConflito = categoria.children.some(child =>
            rawEvents.some(evento =>
                eventosComConflito.has(evento.id) && evento.resourceId === child.id
            )
        );

        if (temConflito) {
            return {
                ...categoria,
                title: `${categoria.title} ⚠️`,
            };
        }

        return categoria;
    });

    const urlCadastrarEvento = "/eventos/evento/cadastrar/"


    // Função auxiliar para pegar início e fim da semana (segunda a domingo)
    function getSemana(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = (day === 0 ? -6 : 1) - day; // alinhar segunda como início
        start.setDate(start.getDate() + diff);
        start.setHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);

        return { start, end };
    }
    const calendario = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
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
                        calendario.prev()
                    } else {
                        calendario.next()
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

                    const currentDate = calendario.getDate()
                    let newYear = currentDate.getFullYear()

                    if (clickX < middle) {
                        newYear -= 1
                    } else {
                        newYear += 1
                    }

                    const newDate = new Date(newYear, currentDate.getMonth(), 1)
                    calendario.gotoDate(newDate)
                    atualizaAno()
                }
            }
        },

        initialView: 'resourceTimelineMonth',
        initialDate: '2025-09-17',
        selectable: true,
        editable: true,
        height: 'auto',
        firstDay: 1,
        resourceAreaHeaderContent: 'CATEGORIA / ESPAÇOS ',
        resourceAreaWidth: '17%',
        locale: 'pt-br',

        slotLabelFormat: [{ weekday: 'short' }, { day: 'numeric' }],
        resourceOrder: 'title',
        resources: resourcesDecorados,
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
        },
        eventClick: function (info) {
            const { start, end } = getSemana(info.event.start);

            const eventosSemana = rawEvents.filter(ev => {
                const evStart = new Date(ev.start);
                const evEnd = new Date(ev.end);
                return evStart <= end && evEnd >= start;
            });

            const lista = document.getElementById("listaEventosSemana");
            lista.innerHTML = "";

            eventosSemana.forEach(ev => {
                const li = document.createElement("li");
                li.textContent = `${new Date(ev.start).toLocaleDateString("pt-BR")} - ${ev.title}`;
                lista.appendChild(li);
            });

            document.getElementById("modalEventosSemana").style.display = "flex"; // abre sobreposto
        }

    })

    function atualizaMes() {
        const currentDate = calendario.getDate()
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        const month = monthNames[currentDate.getMonth()]

        const button = document.querySelector('.fc-monthNav-button')
        if (button) {
            button.innerText = `< ${month} >`
        }
    }

    function atualizaAno() {
        const currentDate = calendario.getDate()
        const year = currentDate.getFullYear()

        const button = document.querySelector('.fc-customYear-button')
        if (button) {
            button.innerText = `< ${year} >`
        }
    }

    calendario.render()
    atualizaMes()
    atualizaAno()
})

document.getElementById("fecharModal").addEventListener("click", () => {
    document.getElementById("modalEventosSemana").style.display = "none";
});
