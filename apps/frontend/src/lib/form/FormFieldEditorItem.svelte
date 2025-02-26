<script lang="ts">
	import { invalidate } from '$app/navigation'
	import CellInput from '$lib/cell/CellInput/CellInput.svelte'
	import FieldIcon from '$lib/field/FieldIcon.svelte'
	import FilterEditor from '$lib/filter/FilterEditor.svelte'
	import { t } from '$lib/i18n'
	import { selectedForm } from '$lib/store/drawer'
	import { getTable } from '$lib/store/table'
	import { trpc } from '$lib/trpc/client'
	import type { Field, IFilter } from '@undb/core'
	import { Button, Label, Toggle } from 'flowbite-svelte'

	const table = getTable()
	export let field: Field

	$: fieldId = field.id.value

	const setFormFieldsVisibilityMutation = trpc().table.form.field.setVisibility.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
		},
	})

	const setFormFieldsRequirementsMutation = trpc().table.form.field.setRequirements.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
		},
	})

	const setFormFieldsVisibility = () => {
		if (!$selectedForm) return
		$setFormFieldsVisibilityMutation.mutate({
			tableId: $table.id.value,
			formId: $selectedForm.id.value,
			visibility: { [fieldId]: true },
		})
	}

	const setFormFieldsRequirements = (required: boolean) => {
		if (!$selectedForm) return
		$setFormFieldsRequirementsMutation.mutate({
			tableId: $table.id.value,
			formId: $selectedForm.id.value,
			requirements: { [fieldId]: required },
		})
	}

	const setFormFieldFilterMutation = trpc().table.form.field.setFilter.mutation({})

	const setFormFieldFilter = () => {
		if (!$selectedForm) return
		$setFormFieldFilterMutation.mutate({
			tableId: $table.id.value,
			formId: $selectedForm.id.value,
			fieldId,
			filter,
		})
	}

	const onChange = (e: Event) => {
		if (!$selectedForm) return
		const target = e.target as HTMLInputElement
		const checked = target.checked
		if (formField) {
			formField.filter = checked ? formField.filter ?? [] : null
		}
		if (!checked) {
			$setFormFieldFilterMutation.mutate({
				tableId: $table.id.value,
				formId: $selectedForm.id.value,
				fieldId,
				filter: null,
			})
		}
	}

	const onRquiredChange = (e: Event) => {
		const target = e.target as HTMLInputElement

		setFormFieldsRequirements(target.checked)
	}

	$: formField = $selectedForm?.fields.value.get(field.id.value)
	$: open = !!formField?.filter
	$: filter = (formField?.filter ?? []) as IFilter[]
	$: previousFields = $selectedForm?.getOrderedField($table.schema).getPreviousFieldIds(field.id.value) ?? []
	$: isFirst = $selectedForm?.getOrderedField($table.schema).isFirst(field.id.value) ?? false
</script>

{#if $selectedForm}
	{#if formField}
		<div
			data-field-id={field.id.value}
			class="fields space-y-2 px-5 py-3 hover:bg-sky-50 dark:hover:bg-gray-900 hover:border-blue-200 border box-border rounded-md relative group dark:border-gray-400"
		>
			{#if !field.required}
				<button class="absolute right-4 top-2 hidden group-hover:block" on:click={() => setFormFieldsVisibility()}>
					<i class="ti ti-eye-closed" />
				</button>
			{/if}
			<Label class="leading-5" for={field.id.value} data-field-id={field.id.value}>
				<div class="inline-flex items-center gap-2">
					<FieldIcon type={field.type} size={16} />
					<span>
						{field.name.value}
					</span>
				</div>
				{#if $selectedForm.fields.isRequired(field.id.value)}
					<span class="text-red-500">*</span>
				{/if}
			</Label>
			<CellInput class="w-full" {field} />
			<div class="flex items-center justify-end gap-2">
				{#if !isFirst}
					<Toggle size="small" checked={open} on:change={onChange}>
						{$t('show form conditions')}
					</Toggle>
				{/if}

				{#if !field.controlled}
					<Toggle
						size="small"
						disabled={field.required}
						checked={$selectedForm.fields.isRequired(field.id.value)}
						on:change={(e) => onRquiredChange(e)}
					>
						{$t('Required', { ns: 'common' })}
					</Toggle>
				{/if}
			</div>
			{#if open}
				<div class="border-t border-t-slate-100 pt-2 space-y-2">
					<FilterEditor
						bind:value={formField.filter}
						let:add
						fieldFilter={(field) => previousFields.includes(field.id)}
					>
						<Button on:click={add} class="w-full mt-2" size="xs" color="alternative">
							{$t('Create New Filter')}
						</Button>
					</FilterEditor>

					<div class="flex justify-end">
						<Button
							size="xs"
							on:click={() => {
								setFormFieldFilter()
							}}
						>
							{$t('Apply', { ns: 'common' })}
						</Button>
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/if}
