<script>
import { ref, computed } from "vue";
import AddItemModal from "./AddInvoiceModal.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faFileExport,
    faFileImport,
    faCheck,
    faMinus,
    faSort,
    faDownload,
    faCloudUpload,
    faCloudDownload,
    faAngleRight,
    faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { toast } from 'vue3-toastify';

library.add(faFileExport);
library.add(faFileImport);
library.add(faCheck);
library.add(faMinus);
library.add(faSort);
library.add(faDownload);
library.add(faCloudUpload);
library.add(faCloudDownload);
library.add(faAngleRight);
library.add(faAngleLeft);

export default {
    components: { AddItemModal, FontAwesomeIcon },
    setup() {
        const items = ref([
            { id: "1", name: "Invoice #011 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "2", name: "Invoice #012 - June 2026", billingDate: "June 26, 2026", status: "Failed", amount: "27.00", plan: "Pro" },
            { id: "3", name: "Invoice #013 - June 2026", billingDate: "June 27, 2026", status: "Paid", amount: "28.00", plan: "Premium" },
            { id: "4", name: "Invoice #014 - June 2026", billingDate: "June 28, 2026", status: "Paid", amount: "25.00", plan: "Elite" },
            { id: "5", name: "Invoice #015 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "29.00", plan: "Pro" },
            { id: "6", name: "Invoice #016 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "7", name: "Invoice #017 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "30.00", plan: "Basic" },
            { id: "8", name: "Invoice #018 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "9", name: "Invoice #019 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "10", name: "Invoice #020 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "45.00", plan: "Premium" },
            { id: "11", name: "Invoice #021 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "12", name: "Invoice #022 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "50.00", plan: "Premium" },
            { id: "13", name: "Invoice #023 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "25.00", plan: "Basic" },
            { id: "14", name: "Invoice #024 - June 2026", billingDate: "June 25, 2026", status: "Paid", amount: "75.00", plan: "Basic" },
            // Add more initial items here...
        ]);

        //Select All
        const selectAll = ref(false);
        const toggleSelectAll = () => {
            selectAll.value = !selectAll.value;
            items.value.forEach((item) => {
                item.selected = selectAll.value;
            });
        };
        const isAllSelected = computed({
            get() {
                return items.value.every((item) => item.selected);
            },
            set(value) {
                selectAll.value = value;
                toggleSelectAll();
            },
        });
        const areSomeSelected = computed(() => items.value.some((item) => item.selected));

        //Add New Item
        const showModal = ref(false);
        const addItem = (item) => {
            items.value.push({ id: `${totalItems + 1}`, ...item });
            showModal.value = false;
        };

        // Sorting
        const sortKey = ref("id");
        const sortOrder = ref("desc");
        const sortItems = (key) => {
            sortKey.value = key;
            sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
            items.value.sort((a, b) => {
                const result = a[key].localeCompare(b[key]);
                return sortOrder.value === "asc" ? result : -result;
            });
        };

        const currentPage = ref(1);
        const itemsPerPage = 10;

        //Functions
        const notify = (msg) => {
            toast(msg);
        };

        // Computed Properties
        const paginatedItems = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return items.value.slice(start, end);
        });

        const totalItems = computed(() => items.value.length);

        const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

        return {
            showModal,
            addItem,
            items,
            paginatedItems,
            currentPage,
            totalItems,
            totalPages,
            itemsPerPage,
            sortItems,
            selectAll,
            toggleSelectAll,
            isAllSelected,
            areSomeSelected,
            notify
        };
    },
};
</script>

<template>
    <div class="bg-white border-separate lg:border-8 md:border-5 border-sky-500 lg:rounded-large md:rounded-3xl">
        <div class="flex justify-between lg:p-8 md:p-5">
            <div>
                <div class="lg:mb-1 md:mb-0 relative">
                    <span class="lg:text-3xl md:text-xl font-semibold tracking-tight">Billing History</span>
                    <span
                        class="rounded-full bg-blue-100 text-blue-600 px-2 py-1 lg:text-sm md:text-xs font-semibold relative -right-2 -top-2">{{
                            totalItems }}
                        Total</span>
                </div>
                <div class="text-gray-500 lg:text-md md:text-sm tracking-wider">Here you will see your billing history.
                </div>
            </div>
            <div class="lg:space-x-2 lg:mb-2 md:space-x-1 md:mb-1">
                <button @click="showModal = true"
                    class="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-full lg:text-md md:text-sm lg:px-5 lg:py-2.5 md:px-4 md:py-2 font-semibold">Add
                    Invoice</button>
                <AddItemModal :show="showModal" @close="showModal = false" :onAddItem="addItem" />
                <button type="button" :disabled="!areSomeSelected" @click="notify('Exporting File')"
                    class="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-full lg:text-md md:text-sm lg:px-5 lg:py-2.5 md:px-4 md:py-2 font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed">
                    <font-awesome-icon icon="cloud-upload" class="mr-2" />
                    Export
                </button>

                <button type="button" :disabled="!areSomeSelected" @click="notify('Downloading File')"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-full lg:text-md md:text-sm lg:px-5 lg:py-2.5 md:px-4 md:py-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <font-awesome-icon icon="cloud-download" class="mr-2" />
                    Download
                </button>
            </div>
        </div>
        <table class="min-w-full table-fixed border-collapse text-left">
            <thead>
                <tr class="border-b border-t border-gray-300">
                    <th class="lg:py-3 md:py-2 lg:pl-8 md:pl-5 lg:w-20 md:w-16">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="isAllSelected" id="select-all-checkbox" class="hidden" />
                            <div class="flex items-center justify-center lg:w-6 lg:h-6 md:w-5 md:h-5 border border-gray-400 rounded-lg cursor-pointer"
                                :class="{ 'bg-blue-500 text-white border-blue-600': isAllSelected || (!isAllSelected && areSomeSelected) }"
                                @click="toggleSelectAll">
                                <font-awesome-icon v-if="isAllSelected" icon="check" />
                                <font-awesome-icon v-if="(!isAllSelected && areSomeSelected)" icon="minus" />
                            </div>
                            <label for="select-all-checkbox" class="ms-2 text-sm font-medium text-gray-900"></label>

                        </div>
                    </th>
                    <th class="py-3 flex space-x-5 items-center text-lg font-bold cursor-pointer"
                        @click="sortItems('name')">
                        Invoice <font-awesome-icon icon="sort" class="lg:ml-5 md:ml-2" />
                    </th>
                    <th class="py-3 text-lg font-bold cursor-pointer" @click="sortItems('billingDate')">Billing Date
                        <font-awesome-icon icon="sort" class="lg:ml-5 md:ml-2" />
                    </th>
                    <th class="py-3 text-lg font-bold cursor-pointer" @click="sortItems('status')">Status
                        <font-awesome-icon icon="sort" class="lg:ml-5 md:ml-2" />
                    </th>
                    <th class="py-3 text-lg font-bold cursor-pointer" @click="sortItems('amount')">Amount
                        <font-awesome-icon icon="sort" class="lg:ml-5 md:ml-2" />
                    </th>
                    <th class="py-3 text-lg font-bold cursor-pointer" @click="sortItems('plan')">Plan <font-awesome-icon
                            icon="sort" class="lg:ml-5 md:ml-2" /></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedItems" :key="item.id" class="border-b border-gray-300">
                    <!-- Checkbox for Each Item -->
                    <td class="lg:py-3 md:py-2 lg:pl-8 md:pl-5 lg:w-20 md:w-16">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="item.selected" :id="'checkbox-' + item.id"
                                class="hidden peer" />
                            <div class="flex items-center justify-center lg:w-6 lg:h-6 md:w-5 md:h-5 bg-white border border-gray-400 rounded-lg text-transparent peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600 cursor-pointer"
                                @click="item.selected = !item.selected; selectAll = items.every((i) => i.selected)">
                                <font-awesome-icon icon="check" class="" />
                            </div>
                            <label :for="'checkbox-' + item.id" class="ms-2 text-sm font-medium text-gray-900"></label>
                        </div>
                    </td>
                    <td class="py-3 flex space-x-5 items-center">
                        <span
                            class="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 text-xl rounded-full">
                            <font-awesome-icon icon="file-export" />
                        </span>
                        <span class="font-bold">{{ item.name }}</span>
                    </td>
                    <td class="py-3 text-gray-600">{{ item.billingDate }}</td>
                    <td class="py-3">
                        <span class="rounded-full  px-2 py-1 text-sm font-medium border" :class="{
                            'bg-blue-100 text-blue-600 border-blue-300': item.status === 'Paid',
                            'bg-red-100 text-red-600 border-red-300': item.status === 'Failed'
                        }">
                            {{ item.status }}
                        </span>
                    </td>
                    <td class="py-3 text-gray-600">USD ${{ item.amount }}</td>
                    <td class="py-3 text-gray-600">{{ item.plan }}</td>
                    <td class="pr-8 py-3 text-gray-600 text-right cursor-pointer text-xl"><font-awesome-icon
                            icon="download" class="ml-2" />
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="px-10 flex justify-between my-4 text-gray-600">
            <div class="flex justify-between">
                <span @click="currentPage--" :class="{ 'pointer-events-none': currentPage === 1 }"
                    class="mr-10 flex items-center justify-center w-12 h-12 cursor-pointer">
                    <font-awesome-icon icon="angle-left" class="mr-2" />Previous
                </span>
                <span @click="currentPage = index + 1" v-for="(page, index) in totalPages"
                    class="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                    :class="{ 'bg-blue-100 text-blue-600': currentPage === page }">
                    {{ page }}
                </span>
                <span @click="currentPage++" :class="{ 'pointer-events-none': currentPage === totalPages }"
                    class="ml-10 flex items-center justify-center w-12 h-12 cursor-pointer">
                    Next<font-awesome-icon icon="angle-right" class="ml-2" />
                </span>
            </div>
            <div>
                <span>Showing {{ itemsPerPage }} of {{ totalItems }} results</span>
            </div>
        </div>
    </div>
</template>