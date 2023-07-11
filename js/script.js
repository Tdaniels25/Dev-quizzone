document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('myModal');
  const closeButton = document.getElementsByClassName('close')[0];

  function showModal() {
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  closeButton.addEventListener('click', closeModal);
  
  showModal();
});
