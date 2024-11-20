import AsyncSelect from 'react-select/async';

interface AsyncSearchProps<T> {
    items: T[];
    setBody: (body: any) => void;
    body: any;
    filterFunction: (item: T, inputValue: string) => boolean; // Função de filtro genérica
    mapToOption: (item: T) => { label: string; value: any }; // Função de mapeamento genérica
    placeholder?: string; // Tornar o placeholder personalizável
}

export function AsyncSearch<T>({
    items,
    body,
    setBody,
    filterFunction,
    mapToOption,
    placeholder = 'Pesquisar',
}: AsyncSearchProps<T>) {
    const filterItems = (inputValue: string) => {
        return items
            .filter((item) => filterFunction(item, inputValue)) // Filtra usando a função genérica
            .map(mapToOption); // Mapeia os resultados para o formato { label, value }
    };

    const promiseOptions = (inputValue: string) =>
        new Promise<any[]>((resolve) => {
            setTimeout(() => {
                resolve(filterItems(inputValue));
            }, 1000);
        });

    const handleChange = (selectedOption: any) => {
        setBody({ ...body, selected: selectedOption }); // Atualiza o estado usando o corpo genérico
        console.log('Selecionado:', selectedOption);
    };

    return (
        <AsyncSelect
            className='w-full'
            placeholder={placeholder}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            onChange={handleChange} // Captura o valor selecionado
        />
    );
}
