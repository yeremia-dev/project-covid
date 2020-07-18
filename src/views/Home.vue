<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h1 class="judul">Data Covid-19</h1>
        <h5 class="sub-judul mb-5">Web untuk melihat data virus corona diseluruh dunia</h5>
      </b-col>
    </b-row>
<!--    <hr>-->
    <b-row>
      <b-col col lg="10">
<!--        <b-row class="label">-->
<!--          <b-col>-->
<!--            <labe><h6>Ketik nama negara disini...</h6></labe>-->
<!--          </b-col>-->
<!--        </b-row>-->
        <b-row>
          <b-col>
            <v-select
              class="style-chooser"
              v-model="selected"
              :options="dataNegara"
              label="name" @input="show">
              <template #no-options>
                Negara yang anda cari tidak ditemukan.
              </template>
            </v-select>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div v-if="tampil" class="bagian-data">
      <b-row>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Jumlah Kasus
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ data.confirmed | numFormat }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-head-side-mask fa-2x text-gray-300"></i>
                  <!--              <i class="fas fa-calendar fa-2x text-gray-300"></i>-->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Sembuh
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ data.recovered | numFormat }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-medkit fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-danger shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    Meninggal Dunia
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ data.deaths | numFormat }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dizzy fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </b-container>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Lato:ital,wght@1,300&display=swap');
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle{
    border-radius: 13px;
    height: 45px;
    border-color: #3d3e47;
    /*border-width: 1px;*/
  }
  /*.style-chooser .vs__dropdown-menu {*/
  /*  background: #dfe5fb;*/
  /*  border: none;*/
  /*  color: #394066;*/
  /*  text-transform: lowercase;*/
  /*  font-variant: small-caps;*/
  /*}*/

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
  .style-chooser .vs__selected{
    font-size: 20px;
    /*margin-left: 20px;*/
  }

  .style-chooser .vs__search{
    margin-left: 20px;
  }

  .judul{
    font-family: 'Bitter', serif;
    text-align: left;
  }
  .sub-judul{
    font-family: 'Lato', sans-serif;
  }
  .bagian-data{
    margin-top: 30px;
  }

</style>
<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      negara: 'it',
      selected: '',
      data: [],
      dataNegara: [],
      tampil: false,

      // value: ' ',
    };
  },
  beforeMount() {
    this.getCountryList();
  },
  methods: {
    load() {
      // console.log('Jalan juga');
      // eslint-disable-next-line global-require
      // const axios = require('axios');

      axios({
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country/code',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
          'x-rapidapi-key': '4d122368cemsh45d5e0ed204c72fp13f919jsn1a8ebe16c3ff',
          useQueryString: true,
        },
        params: {
          format: 'json',
          code: this.negara,
        },
      })
        .then((response) => {
          console.log(response.data[0]);
          // eslint-disable-next-line prefer-destructuring
          this.data = response.data[0];
          // this.getCountryList();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCountryList() {
      // console.log('Jalan');
      axios({
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/help/countries',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
          'x-rapidapi-key': '4d122368cemsh45d5e0ed204c72fp13f919jsn1a8ebe16c3ff',
          useQueryString: true,
        },
        params: {
          format: 'json',
        },
      })
        .then((response) => {
          // console.log(response.data);
          this.dataNegara = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    show() {
      console.log(this.selected.alpha2code.toLowerCase());
      this.negara = this.selected.alpha2code.toLowerCase();
      this.tampil = true;
      console.log(this.negara);
      this.load();
    },
  },
};
</script>
