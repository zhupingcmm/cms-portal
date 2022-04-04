import { useCallback } from 'react';
import { useState } from 'react';


export const useUndo = <T>(initialPresent: T) => {
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    });

    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;

    const undo = useCallback((newPresent: T) => {
        setState(currentState => {
            const { past, present, future} = currentState;
            if (past.length === 0) return currentState;
            const previous = past[past.length -1];
            const newPast = past.slice(0, past.length -1);
            return {
                past, newPast,
                present: previous,
                future: [present, ...future]
            }
        })
    }, [setState]);

    const redo = useCallback((newPresent: T) => {
        setState((currentState) => {
            const { past, present, future} = currentState;
            if (future.length === 0) return currentState;
            const next = future[0];
            const newFuture = future.slice(1);
    
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        })
    }, []);

    const reset = useCallback((newPresent: T) => {
        setState(() => {
            return {
                past: [],
                present: newPresent,
                future: [],
              };
        })
    }, []);

    return [
        state,
        {undo, redo, reset, canRedo, canUndo} as const
    ]

}