document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const reservaPopup = document.getElementById('reservaPopup');
    const destinoPopup = document.getElementById('destinoPopup');
    const closeButtons = document.querySelectorAll('.popup-close');
    const reservaForm = document.querySelector('.reserva-form');
    const reservarDestinoBtn = document.getElementById('reservarDestino');
    const ctaButton = document.querySelector('.cta-button');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const targetSection = document.querySelector('#destinos');
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }

    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up', 'scroll-down');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
        scrollTimeout = setTimeout(() => {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }, 1500);
        if (currentScroll > 50) {
            header.style.padding = '0.5rem 0';
        } else {
            header.style.padding = '1rem 0';
        }
    });

    const destinosInfo = {
        'Rio de Janeiro': {
            imagem: 'https://blog.paineirascorcovado.com.br/wp-content/uploads/2024/11/Cristo-Redentor-Por-do-sol-scaled.jpg',
            descricao: 'O Rio de Janeiro é uma cidade vibrante que combina belezas naturais deslumbrantes com uma rica cultura e história. Conhecida mundialmente por suas praias icônicas, o Cristo Redentor e o Pão de Açúcar.',
            melhorEpoca: 'De abril a junho e de setembro a novembro, quando o clima está mais ameno e há menos turistas.',
            dicas: [
                'Visite o Cristo Redentor no início da manhã para evitar filas',
                'Use protetor solar mesmo em dias nublados',
                'Experimente a feijoada em um restaurante tradicional',
                'Pegue o bondinho do Pão de Açúcar no fim da tarde para ver o pôr do sol'
            ],
            atracoes: [
                'Cristo Redentor',
                'Pão de Açúcar',
                'Praia de Copacabana',
                'Escadaria Selarón',
                'Jardim Botânico'
            ]
        },
        'Fernando de Noronha': {
            imagem: 'https://super.abril.com.br/wp-content/uploads/2022/01/SI_435_ORCL_Fernando-Noronha_site.jpg?quality=70&strip=info&w=720&h=440&crop=1',
            descricao: 'Fernando de Noronha é um arquipélago paradisíaco com algumas das praias mais bonitas do Brasil. Suas águas cristalinas e vida marinha abundante fazem deste local um paraíso para mergulhadores e amantes da natureza.',
            melhorEpoca: 'De agosto a janeiro, quando o mar está mais calmo e a visibilidade para mergulho é melhor.',
            dicas: [
                'Reserve com antecedência devido ao limite de visitantes',
                'Alugue um buggy para explorar a ilha',
                'Faça mergulho com golfinhos',
                'Visite a Praia do Sancho, considerada uma das mais bonitas do mundo'
            ],
            atracoes: [
                'Praia do Sancho',
                'Baía dos Golfinhos',
                'Fortaleza Nossa Senhora dos Remédios',
                'Mirante da Baía dos Porcos',
                'Projeto Tamar'
            ]
        },
        'Jericoacoara': {
            imagem: 'https://desviantes.blob.core.windows.net/desviantes/media/blog/posts/386eba4c673274d70aa120532f8e76f4.jpg',
            descricao: 'Jericoacoara é um paraíso natural no Ceará, conhecida por suas dunas de areia branca, lagoas cristalinas e um dos pores do sol mais bonitos do Brasil. Uma vila de pescadores que se transformou em um dos destinos mais desejados do país.',
            melhorEpoca: 'De julho a dezembro, quando o clima está mais seco e as lagoas estão mais cheias.',
            dicas: [
                'Assista ao pôr do sol na Duna do Pôr do Sol',
                'Visite a Lagoa do Paraíso em um dia de sol',
                'Faça um passeio de buggy pelas dunas',
                'Experimente a culinária local nos restaurantes da vila'
            ],
            atracoes: [
                'Duna do Pôr do Sol',
                'Lagoa do Paraíso',
                'Pedra Furada',
                'Praia de Jericoacoara',
                'Serrote'
            ]
        }
    };

    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
    function openPopup(popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    document.querySelectorAll('.saiba-mais').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.destino-card');
            const destino = card.querySelector('h3').textContent;
            const info = destinosInfo[destino];
            if (info) {
                document.getElementById('destinoImage').src = info.imagem;
                document.getElementById('destinoTitulo').textContent = destino;
                document.getElementById('destinoDescricao').textContent = info.descricao;
                document.getElementById('destinoEpoca').textContent = info.melhorEpoca;

                const dicasList = document.getElementById('destinoDicas');
                dicasList.innerHTML = '';
                info.dicas.forEach(dica => {
                    const li = document.createElement('li');
                    li.textContent = dica;
                    dicasList.appendChild(li);
                });

                const atracoesList = document.getElementById('destinoAtracoes');
                atracoesList.innerHTML = '';
                info.atracoes.forEach(atracao => {
                    const li = document.createElement('li');
                    li.textContent = atracao;
                    atracoesList.appendChild(li);
                });
                openPopup(destinoPopup);
            }
        });
    });
    reservarDestinoBtn.addEventListener('click', () => {
        closePopup(destinoPopup);
        openPopup(reservaPopup);
    });

    document.querySelectorAll('.reservar').forEach(button => {
        button.addEventListener('click', () => {
            openPopup(reservaPopup);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup-overlay');
            closePopup(popup);
        });
    });

    [reservaPopup, destinoPopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup(popup);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [reservaPopup, destinoPopup].forEach(popup => {
                if (popup.classList.contains('active')) {
                    closePopup(popup);
                }
            });
        }
    });
    
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(reservaForm);
        const data = Object.fromEntries(formData);
        
        alert('Reserva enviada com sucesso! Entraremos em contato em breve.');
        
        reservaForm.reset();
        closePopup(reservaPopup);
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('destino-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.index * 0.2}s`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementosParaAnimar = document.querySelectorAll('.destino-card, .pacote-card, .contato-form, .section-title');
    elementosParaAnimar.forEach((elemento, index) => {
        elemento.classList.add('fade-in');
        if (elemento.classList.contains('destino-card')) {
            elemento.dataset.index = index;
        }
        observer.observe(elemento);
    });
});
