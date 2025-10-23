import { computed, ref, watch, nextTick } from 'vue';
import Button from './ui/Button.vue';
const open = defineModel('open', { default: false });
const props = defineProps();
const title = ref('');
const status = ref('todo');
const priority = ref('medium');
const titleEl = ref(null);
watch(() => props.task, (t) => {
    if (!t)
        return;
    title.value = t.title;
    status.value = t.status;
    priority.value = t.priority ?? 'medium';
    if (open.value)
        nextTick(() => titleEl.value?.focus());
}, { immediate: true });
const canSave = computed(() => title.value.trim().length > 0);
const emit = defineEmits();
function onSave() {
    if (!canSave.value)
        return;
    emit('save', { title: title.value.trim(), status: status.value, priority: priority.value });
    open.value = false;
}
function onClose() { open.value = false; }
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaultModels = {
    'open': false,
};
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.teleport, typeof __VLS_components.Teleport, typeof __VLS_components.teleport, ]} */ ;
// @ts-ignore
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
if (__VLS_ctx.open) {
    // @ts-ignore
    [open,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "u-grid u-grid-gap" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ref: "titleEl",
        ...{ class: "input" },
        placeholder: "Task title",
    });
    (__VLS_ctx.title);
    /** @type {typeof __VLS_ctx.titleEl} */ ;
    // @ts-ignore
    [title, titleEl,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "u-flex u-gap-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        ...{ class: "input" },
        value: (__VLS_ctx.status),
    });
    // @ts-ignore
    [status,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "todo",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "doing",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "done",
    });
    __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
        ...{ class: "input" },
        value: (__VLS_ctx.priority),
    });
    // @ts-ignore
    [priority,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "low",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "medium",
    });
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        value: "high",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "u-flex u-gap-3" },
        ...{ style: {} },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "ghost",
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        variant: "ghost",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    const __VLS_10 = ({ click: {} },
        { onClick: (__VLS_ctx.onClose) });
    const { default: __VLS_11 } = __VLS_7.slots;
    // @ts-ignore
    [onClose,];
    var __VLS_7;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.canSave),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.canSave),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = ({ click: {} },
        { onClick: (__VLS_ctx.onSave) });
    const { default: __VLS_18 } = __VLS_14.slots;
    // @ts-ignore
    [canSave, onSave,];
    var __VLS_14;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
