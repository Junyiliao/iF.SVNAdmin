(function (jQ) {
  "use strict";
  /**
    Main class to manage the GUI and all of it's requirements.
  **/
  function AppEngine() {
    this.config = {};
  }

  AppEngine.prototype.init = function () {
    brite.viewDefaultConfig.loadTmpl = true;
    brite.viewDefaultConfig.loadCss = true;
    brite.viewDefaultConfig.loadJs = true;
  };

  AppEngine.prototype.bootstrap = function () {
    svnadmin.service.ajax({
      url: "service/",
      data: { m: "LoginService", action: "check" }
    })
    .done(function (data) {
      brite.display("MainView", ".AppContent");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        brite.display("LoginView", ".AppContent");
      } else {
        // Network error.
      }
    });
  };

  AppEngine.prototype.showUserInfoView = function (providerId, userId) {
    //alert("prov: " + providerId + "; user: " + userId);
    brite.display("UserInfoView", "#page-wrapper", { providerid: providerId, userid: userId }, { emptyParent: true });
  };

  window.svnadmin = window.svnadmin || {};
  window.svnadmin.app = window.svnadmin.app || new AppEngine();
}(jQuery));


(function (jQ) {
  "use strict";
  /**
    Remote web service client class.
    Provides access to all REST services.
  **/
  function ServiceClient() {
  }

  ServiceClient.prototype.ajax = function (settings) {
    return jQ.ajax(settings);
  };

  ServiceClient.prototype.login = function (login) {
  };

  ServiceClient.prototype.getSystemInfo = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "CommonService",
        action: "systeminfo"
      }
    });
  }

  ServiceClient.prototype.getFileSystemInfo = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "CommonService",
        action: "filesysteminfo"
      }
    });
  };

  ServiceClient.prototype.getUserProviders = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "providers"
      }
    });
  };

  ServiceClient.prototype.getUsers = function (providerId, offset, num) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "list",
        providerid: providerId,
        offset: offset,
        num: num
      }
    });
  };

  ServiceClient.prototype.createUser = function (providerId, name, password) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "create",
        providerid: providerId,
        name: name,
        password: password
      }
    });
  };

  ServiceClient.prototype.deleteUser = function (providerId, userId) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "delete",
        providerid: providerId,
        id: userId
      }
    });
  };

  window.svnadmin = window.svnadmin || {};
  window.svnadmin.service = window.svnadmin.service || new ServiceClient();
}(jQuery));


/**
 * Template Helper Functions
 */
$.views.helpers({
  tr: function (str) {
    "use strict";
    return str;
  },
  formatSize: function (bytes) {
    var kb = bytes / 1024,
      mb = kb / 1024,
      gb = mb / 1024,
      tb = gb / 1024;
    return Math.round(gb * 100) / 100 + " GB";
  }
});


/**
  Main entry point for scripts.
**/
jQuery(document).ready(function () {
  "use strict";
  jQuery.noConflict();
  svnadmin.app.init();
  svnadmin.app.bootstrap();
});