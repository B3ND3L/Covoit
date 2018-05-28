var comm = {
  GET : function(url){
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.onload = function (){
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
      };
      
      xhr.onerror = function(){reject(xhr.statusText);};

      xhr.open("GET", url, true);
      xhr.send();
    });
  },
  POST : function(url, data){
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.onload = function (){
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
      };
      
      xhr.onerror = function(){reject(xhr.statusText);};

      xhr.open("POST", url, true);
      xhr.send(data);
    });
  },
  PUT : function(url, data){
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.onload = function (){
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
      };
      
      xhr.onerror = function(){reject(xhr.statusText);};

      xhr.open("PUT", url, true);
      xhr.send(data);
    });
  }
};