// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import "./libs/shim/expect.js";
import "./libs/shim/urijs.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Pre = Symbol.for("pre");
const Post = Symbol.for("post");
const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  environment: {
    "project-host": "https://project-pre.pedulisehat.id",
    "passport-host": "https://passport-pre.pedulisehat.id",
    "psuic-host": "https://psuic-pre.pedulisehat.id",
    "trade-host": "https://trade-pre.pedulisehat.id",
    "activity-host": "https://activity-pre.pedulisehat.id",
    "share-host": "https://share-pre.pedulisehat.id",
    project_short_link: "campaign20190628001",
    requestBody: '{"project_id":""}'
  }
});

export default function() {
  postman[Pre].push(() => {
    // 预定义13位时间戳
    pm.globals.set("timestamp13", Math.round(new Date()));
  });
  postman[Post].push(() => {
    // 每个请求设置超时时间，超过10s则认为断言失败
    var cost = pm.response.responseTime;
    pm.test("responseTime is: " + cost, function() {
      pm.expect(cost).to.be.below(10000);
    });

    // 请求的返回值判断是否为200

    // // 用户信息接口可能200，401
    // var request401 = [];

    // if (request401.indexOf(pm.request.url.path) > -1) {
    //     pm.expect(pm.response.code).to.be.oneOf([200,401]);
    //     return;
    // }

    // 其余判断为200
    pm.test[
      ("response code is not 200 or 401",
      function() {
        pm.expect(pm.response.code).to.be.oneOf([200, 401]);
      })
    ];
  });

  group("home-page", function() {
    postman[Request]({
      name: "project_search_history",
      id: "ea85f057-426b-497d-b18a-c0a668192551",
      method: "GET",
      address: "{{project-host}}/v1/project_search_history?_={{timestamp13}}"
    });

    postman[Request]({
      name: "user",
      id: "4d638550-da15-431b-9248-4a5f95a9bece",
      method: "GET",
      address: "{{passport-host}}/v1/user?_={{timestamp13}}"
    });

    postman[Request]({
      name: "search_popular_word",
      id: "24ca2fe7-7757-4794-9eb5-9480315fda60",
      method: "GET",
      address: "{{project-host}}/v1/search_popular_word?_={{timestamp13}}"
    });

    postman[Request]({
      name: "public",
      id: "53be7440-6c36-4b86-831f-0ee5408c1eea",
      method: "GET",
      address:
        "{{project-host}}/v1/public?page=1&limit=20&category_id=12,13&_={{timestamp13}}",
      post(response) {
        var body = JSON.parse(responseBody) || {};
        var data = body.data;

        // 断言项目列表长度大于2，取第二个项目为测试例子
        pm.test("[home-page] public data length is above 2", function() {
          pm.expect(data.length).to.be.above(2);
        });

        var project = data[1] || {};

        // 断言短链的长度不为空
        pm.test("[home-page] public shor_ling is valid", function() {
          pm.expect(project.short_link.length).to.be.above(1);
        });

        pm.globals.set("project_short_link", project.short_link);
      }
    });

    postman[Request]({
      name: "banner",
      id: "33cd18cc-c096-4eb2-9bc7-1b5637ce45cd",
      method: "GET",
      address: "{{project-host}}/v1/banner?_={{timestamp13}}"
    });

    postman[Request]({
      name: "level_rules",
      id: "e9762dd1-86a3-45ae-9aeb-9bd76adfd6a4",
      method: "GET",
      address: "{{psuic-host}}/v1/level_rules?_={{timestamp13}}"
    });

    postman[Request]({
      name: "user_level",
      id: "8deace0f-7a02-426b-9f27-69f7048e29e6",
      method: "GET",
      address: "{{psuic-host}}/v1/user_level?_={{timestamp13}}"
    });
  });

  group("project-detail", function() {
    postman[Request]({
      name: "detail",
      id: "c322e92c-0738-4211-9927-03e3d3a7073f",
      method: "GET",
      address:
        "{{project-host}}/v1/project/detail?project_id=&short_link={{project_short_link}}&_={{timestamp13}}",
      post(response) {
        var body = JSON.parse(responseBody) || {};
        var data = body.data || {};

        // 判断字段的是否存在
        var user_id = data.user_id;
        var project_id = data.project_id;

        pm.variables.set("user_id", user_id);
        pm.variables.set("project_id", project_id);
      }
    });

    postman[Request]({
      name: "detail_id_link",
      id: "ca46796a-cc8b-43b5-b220-f4808d237274",
      method: "GET",
      address:
        "{{project-host}}/v1/project/dynamic/update/detail?project_id={{project_id}}&short_link={{project_short_link}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "share_short_link",
      id: "b534e86b-803d-4769-a4e2-6b0b93de0e1f",
      method: "POST",
      address: "{{share-host}}/v1/share_short_link",
      data: "{{requestBody}}",
      headers: {
        "Content-Type": "application/json"
      },
      pre() {
        var project_id = pm.variables.get("project_id");
        var project_short_link = pm.variables.get("project_short_link");
        var requestBody = {
          item_id: project_id,
          item_type: 1,
          item_short_link: project_short_link
        };
      }
    });

    postman[Request]({
      name: "project_pv",
      id: "0a5decad-7ebb-4a3b-b11b-4d91823f0241",
      method: "POST",
      address: "{{project-host}}/v1/project_pv",
      data: "{{requestBody}}",
      headers: {
        "Content-Type": "application/json"
      },
      pre() {
        var project_short_link = pm.globals.get("project_short_link");
        var requestBody = {
          project_id: "",
          short_link: project_short_link
        };

        pm.variables.set("requestBody", JSON.stringify(requestBody));
      }
    });

    postman[Request]({
      name: "show",
      id: "b8320e8c-da59-44fd-b860-463a64ecd435",
      method: "GET",
      address:
        "{{project-host}}/v1/project_verify/{{project_id}}/show?_={{timestamp13}}"
    });

    postman[Request]({
      name: "statistics",
      id: "2a64d346-d5e3-4c6a-b86e-4b07fc8de53b",
      method: "GET",
      address:
        "{{project-host}}/v1/statistics?project_id={{project_id}}&short_link={{project_short_link}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "project_link",
      id: "23a45830-fc58-4195-a645-4e8675562afa",
      method: "GET",
      address:
        "{{project-host}}/v1/project_link?project_id={{project_id}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "donated_carousels",
      id: "3ab7ffd8-efe8-40be-a938-674d262ec2c8",
      method: "GET",
      address:
        "{{trade-host}}/v1/donated_carousels?limit=200&project_id={{project_id}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "project_confirm",
      id: "9f92ebbc-abb5-41ce-b158-f25601426c96",
      method: "GET",
      address:
        "{{project-host}}/v1/project_confirm?project_id={{project_id}}&short_link={{project_short_link}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "activities",
      id: "78d0cc4e-1b61-4a53-b018-3b6565fd6ac7",
      method: "GET",
      address:
        "{{project-host}}/v1/activities?project_id={{project_id}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "partner_card",
      id: "8df59c65-09d0-4410-aa03-c3808a28045f",
      method: "GET",
      address:
        "{{activity-host}}/v1/prr/partner_card?project_id={{project_id}}&_={{timestamp13}}"
    });
  });

  group("donate", function() {
    postman[Request]({
      name: "detail",
      id: "79528254-329b-489a-9f0e-68f11ac9db68",
      method: "GET",
      address:
        "{{project-host}}/v1/project/detail?project_id={{project_id}}&short_link={{project_short_link}}&_={{timestamp13}}"
    });

    postman[Request]({
      name: "pay_channel",
      id: "1310b463-b8c8-41e2-8b24-22ca1d17fa0a",
      method: "GET",
      address: "{{trade-host}}/v2/pay_channel?_={{timestamp13}}"
    });
  });

  postman[Pre].pop();
  postman[Post].pop();
}
