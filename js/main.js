$(document).ready(function(){
    // Make request to Github
    $.ajax({
      url: 'https://api.github.com/users/jamiepeeso',
      data: {
        client_id: 'fdfd3cff98adf96f5456',
        client_secret: 'a970bcc5d8a00570c0400f83dba3b1a6e9af75a9'
      }
    }).done(function(user){
      $.ajax({
        url: 'https://api.github.com/users/jamiepeeso/repos',
        data: {
          client_id: 'fdfd3cff98adf96f5456',
          client_secret: 'a970bcc5d8a00570c0400f83dba3b1a6e9af75a9',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row"> 
                <div class="col-md-7">
                  <img class="screenshot" src="${repo.html_url + '/blob/master/images/screenshot.PNG?raw=true' }" /></div>
                </div>
                <div class="col-md-3">
                  <strong>${repo.name}</strong>: ${repo.description} <br><br>Last Updated: ${repo.updated_at}
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-secondary btn-block">Repo Page</a>
                  <br><br>
                </div>
              </div>
            </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="card">
          <h4 class="card-header">${user.name}</h4>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <br><br>
                <a target="_blank" href="${user.html_url}" class="btn btn-secondary btn-block">View Profile</a>
              </div>
              <div class="col-md-8">
              <button type="button" class="btn btn-outline-secondary">Public Repos: ${user.public_repos}</button>   
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>    
            </div>
          </div>
        </div>
        <br><br>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
});