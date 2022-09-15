document.documentElement.dataset.loading = ''

addEventListener('DOMContentLoaded', () => {
	delete document.documentElement.dataset.loading
})
