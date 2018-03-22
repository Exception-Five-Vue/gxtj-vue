'use strict'

import Vue from 'vue'
import ModalDialogs, { makeDialog } from 'vue-modal-dialogs'

import Confirm from '../../components/confirm.vue'

// Initialize ModalDialogs
Vue.use(ModalDialogs)

// Make serval dialog functions
export const confirm = makeDialog(Confirm)

// You can install dialog functions into Vue's prototype
Vue.prototype.$confirm = confirm
