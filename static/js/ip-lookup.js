document.addEventListener('DOMContentLoaded', function() {
  const ipDisplay = document.getElementById('ip-address');
  const ipDetails = document.getElementById('ip-details');
  const lookupBtn = document.getElementById('lookup-btn');
  const loadingSpinner = document.getElementById('loading-spinner');
  
  if (lookupBtn) {
    // Automatically fetch IP on page load
    fetchIpInfo();
    
    // Also allow manual refresh
    lookupBtn.addEventListener('click', function() {
      fetchIpInfo();
    });
  }
  
  function fetchIpInfo() {
    if (loadingSpinner) loadingSpinner.classList.remove('d-none');
    if (ipDisplay) ipDisplay.textContent = 'Loading...';
    if (ipDetails) ipDetails.innerHTML = '';
    
    // Fetch IP information using ipinfo.io
    fetch('https://ipinfo.io/json?token=56ce5f0209ac39')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (loadingSpinner) loadingSpinner.classList.add('d-none');
        
        // Display IP address
        if (ipDisplay) ipDisplay.textContent = data.ip || 'Unknown';
        
        // Create and display IP details
        if (ipDetails) {
          let detailsHTML = `
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">IP Information</h5>
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <th>Location</th>
                      <td>${data.city || ''}, ${data.region || ''}, ${data.country || ''}</td>
                    </tr>
                    <tr>
                      <th>ISP / Organization</th>
                      <td>${data.org || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <th>Hostname</th>
                      <td>${data.hostname || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <th>Coordinates</th>
                      <td>${data.loc || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <th>Timezone</th>
                      <td>${data.timezone || 'Unknown'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
          
          ipDetails.innerHTML = detailsHTML;
        }
      })
      .catch(error => {
        console.error('Error fetching IP info:', error);
        if (loadingSpinner) loadingSpinner.classList.add('d-none');
        if (ipDisplay) ipDisplay.textContent = 'Error loading IP';
        if (ipDetails) {
          ipDetails.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Failed to load IP information. Please try again later.
            </div>
          `;
        }
      });
  }
});
