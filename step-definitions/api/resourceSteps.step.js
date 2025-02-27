import { Given, When, Then } from "@cucumber/cucumber";
import ResourceClient from "../../api/clients/resourceClient.js";
import ResourceModel from "../../api/models/resourceModel.js";
import { validateStatusCode } from "../../api/utils/apiUtils.js";
import { expect } from "@playwright/test";
import nconf from "nconf";

let resourceClient;
let resourceId;
let createdResourceResponse;
let createdResource;
let retrievedResourceResponse;
let retrievedResource;

// Backgroud info get - https://reqres.in/api/users/4
// {
//     "id": 4,
//     "email": "eve.holt@reqres.in",
//     "first_name": "Eve",
//     "last_name": "Holt",
//     "avatar": "https://reqres.in/img/faces/4-image.jpg"
// }

Given("User creates a resource client", function () {
  if (!this.token) {
    throw new Error(
      "Token is not set in the World. Ensure the authentication step runs first."
    );
  }
  const baseUrl = nconf.get("apiBaseUrl");
  resourceClient = new ResourceClient(baseUrl, this.token);
});

// Have to assign existing user.id for creating user because https://reqres.in/ only getting existing users for demonstration.
When(
  "User creates a new user resource with name {string} and email {string}",
  async function (name, email) {
    const resourceData = { name, email };
    createdResourceResponse = await resourceClient.createUsersResource(
      resourceData
    );
    createdResource = createdResourceResponse.data;
    resourceId = 4;
  }
);

Then("The user resource should be created successfully", function () {
  expect(createdResourceResponse.status).toEqual(201);

  const resourceModel = new ResourceModel(
    createdResource.name,
    createdResource.email,
    createdResource.id
  );
  this.attach(
    `Test Data: ${JSON.stringify(resourceModel, null, 2)}`,
    "application/json"
  );
});

When("User retrieves the user resource by ID", async function () {
  retrievedResourceResponse = await resourceClient.getUsersResource(
    parseInt(resourceId)
  );
  retrievedResource = retrievedResourceResponse.data;
  expect(retrievedResourceResponse.status).toEqual(200);
});

Then(
  "The user resource details should match name {string} and email {string}",
  function (name, email) {
    const resourceModel = new ResourceModel(
      retrievedResource.data.first_name,
      retrievedResource.data.email,
      retrievedResource.data.id
    );
    expect(resourceModel.name).toEqual(name);
    expect(resourceModel.email).toEqual(email);

    this.attach(
      `Test Data: ${JSON.stringify(resourceModel, null, 2)}`,
      "application/json"
    );
  }
);

// Note - No User Creation - unsuccessful is available here - https://reqres.in/, have to use Register for demnonstration here.
When(
  "User attempts to create a register resource with invalid data",
  async function () {
    try {
      await resourceClient.createRegisterResource({});
    } catch (error) {
      this.errorResponse = error.response;
    }
  }
);

Then("The register API should return a {int} error", function (statusCode) {
  validateStatusCode(this.errorResponse, statusCode);
});
