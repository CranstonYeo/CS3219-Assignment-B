<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4 text-center">
        CS3219 Assignment B Contacts Application
      </h1>
    </div>

    <div
      class="alert alert-dismissible fade show"
      v-bind:class="message == '' ? 'alert-light' : 'alert-danger'"
      role="alert"
    >
      {{ message }}
    </div>

    <b-card
      class="mx-auto"
      title="Add/Edit a contact"
      align="left"
      style="max-width: 71rem;"
    >
      <b-form inline @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            class="mr-3"
            id="input-1"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            class="mr-3"
            id="input-2"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Phone No.:" label-for="input-3">
          <b-form-input
            class="mr-3"
            id="input-3"
            v-model="form.phone"
            required
            placeholder="Enter phone number"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Gender:" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.gender"
            :options="gender"
            required
          ></b-form-select>
        </b-form-group>

        <b-button
          class="mt-3 mr-3"
          v-if="!isEditing"
          type="submit"
          variant="primary"
          >Submit</b-button
        >

        <b-button class="mt-3 mr-3" v-else type="submit" variant="primary"
          >Update</b-button
        >

        <b-button class="mt-3" v-if="!isEditing" type="reset" variant="danger"
          >Reset</b-button
        >

        <b-button class="mt-3" v-else type="reset" variant="danger"
          >Cancel</b-button
        >
      </b-form>
    </b-card>

    <b-container class="mt-5">
      <h1>List of Contacts</h1>

      <b-table
        striped
        bordered
        hover
        responsive
        style="max-width: 80rem;"
        :items="contacts"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        :tbody-tr-class="rowClass"
        :fields="fields"
      >
        <template v-slot:cell(actions)="data">
          <h5 v-if="isEditing">-</h5>
          <b-button
            v-if="!isEditing"
            variant="primary mr-3"
            @click="updateClicked(data.item._id)"
          >
            Update
          </b-button>
          <b-button
            v-if="!isEditing"
            variant="danger"
            @click="deleteContact(data.item._id)"
          >
            Delete
          </b-button>
        </template>
      </b-table>

      <b-form-input
        class="mb-2"
        v-model="filter"
        type="search"
        placeholder="Search Contacts"
      />

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      />
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  mounted() {
    this.getContacts();
  },
  data() {
    return {
      contacts: [],
      message: "",
      filter: "",
      perPage: 4,
      currentPage: 1,
      isEditing: false,
      selectedContactId: "",
      fields: ["name", "email", "phone", "gender", "actions"],
      gender: [{ text: "Select Gender", value: null }, "Male", "Female"],
      form: {
        name: "",
        email: "",
        phone: "",
        gender: null,
      },
      show: true,
    };
  },
  computed: {
    rows() {
      return this.contacts.length;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.isEditing) {
        // add new contact
        axios
          .post("http://localhost:8080/api/contacts", this.form)
          .then((response) => {
            if (response.data.message == "New contact created!") {
              this.getContacts();
              this.form.name = "";
              this.form.email = "";
              this.form.phone = "";
              this.form.gender = null;
              // Trick to reset/clear native browser form validation state
              this.show = false;
              this.$nextTick(() => {
                this.show = true;
              });
            }
          })
          .catch((e) => {
            this.message = e.message;
          });
      } else {
        // update existing contact
        axios
          .put(
            "http://localhost:8080/api/contacts/" + this.selectedContactId,
            this.form
          )
          .then((response) => {
            if (response.data.message == "Contact Info updated") {
              this.getContacts();
              this.form.name = "";
              this.form.email = "";
              this.form.phone = "";
              this.form.gender = null;
              // Trick to reset/clear native browser form validation state
              this.show = false;
              this.$nextTick(() => {
                this.show = true;
              });
              this.selectedContactId = "";
              this.isEditing = false;
            }
          })
          .catch((e) => {
            this.message = e.message;
          });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.gender = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.selectedContactId = "";
      this.isEditing = false;
    },
    getContacts() {
      axios
        .get("http://localhost:8080/api/contacts")
        .then((response) => {
          this.contacts = response.data.data;
        })
        .catch((e) => {
          this.message = e.message;
        });
    },
    updateClicked(id) {
      this.selectedContactId = id;
      let contact = this.contacts.find((x) => x._id === id);
      this.form.name = contact.name;
      this.form.email = contact.email;
      this.form.phone = contact.phone;
      this.form.gender = contact.gender;
      this.isEditing = true;
    },
    deleteContact(id) {
      axios
        .delete("http://localhost:8080/api/contacts/" + id)
        .then((response) => {
          if (response.data.message == "Contact deleted") {
            this.getContacts();
          }
        })
        .catch((e) => {
          this.message = e.message;
        });
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item._id === this.selectedContactId) return "table-success";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
