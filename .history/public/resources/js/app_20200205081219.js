const weatherSearchForm = document.querySelector('form')
const search = document.querySelector('input')
const errmsg = document.querySelector('#wrpt-errmsg')
const weatherreport = document.querySelector('#weather-rpt')



weatherSearchForm.addEventListener('submit', (e) => {
            e.preventDefault()
            errmsg.textContent = 'Loading...'
            weatherreport.tex

            const location = search.value
            fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                        errmsg.textContent = data.error
                    } else {
                        errmsg.textContent = ''
                        search.textContent = ''
                        const report = 'It is currently ' + data.forecast + ' in ' + data.location + '. You searched for weather in ' + data.address + '.'
                        weatherreport.textContent = report
                    }
                })
            })